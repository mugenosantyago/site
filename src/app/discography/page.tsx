'use client'; // This page interacts with browser APIs (localStorage, Spotify SDK)

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image'; // For album art

// --- Type Augmentation for Spotify SDK --- 
declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: typeof Spotify;
  }
}
// -----------------------------------------

// Define structure for album item (optional but good practice)
interface AlbumItem {
  id: string;
  name: string;
  images: { url: string }[];
  external_urls: { spotify: string };
  uri: string; // Make sure uri is part of AlbumItem if used for context_uri
}

// A simple backdrop component (can be moved to a shared file if used in many places)
const SidebarBackdrop = ({ show, onClick }: { show: boolean; onClick: () => void }) => {
  return <div className={`sidebar-backdrop ${show ? 'show' : ''}`} onClick={onClick}></div>;
};

// Component that contains the main discography logic
function DiscographyContent() {
  const searchParams = useSearchParams();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [albums, setAlbums] = useState<AlbumItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePlayerIndex, setActivePlayerIndex] = useState<number | null>(null);

  const playerRef = useRef<Spotify.Player | null>(null);
  const deviceIdRef = useRef<string | null>(null);
  const sdkReady = useRef(false); 
  const [isSdkReady, setIsSdkReady] = useState(false);

  // Spotify SDK Loading Hook
  useEffect(() => {
    if (window.Spotify) {
      sdkReady.current = true;
      setIsSdkReady(true);
      return;
    }
    window.onSpotifyWebPlaybackSDKReady = () => {
      sdkReady.current = true;
      setIsSdkReady(true);
    };
    const script = document.getElementById('spotify-sdk-script');
    if (!script) {
        const newScript = document.createElement('script');
        newScript.id = 'spotify-sdk-script';
        newScript.src = 'https://sdk.scdn.co/spotify-player.js';
        newScript.async = true;
        document.body.appendChild(newScript);
    } 
  }, []);

  // Authorization Flow
  useEffect(() => {
    const code = searchParams.get('code');
    const clientId = 'b618d7a76b81445c8b2f2c3d914e703e';
    const redirectUri = process.env.NODE_ENV === 'production' 
                          ? 'https://santyago.io/discography'
                          : 'http://localhost:3000/discography';

    const getToken = async (authCode: string) => {
      const codeVerifier = localStorage.getItem('code_verifier');
      if (!codeVerifier) {
        setError('Code verifier not found.'); setIsLoading(false); return;
      }
      const payload = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: clientId, grant_type: 'authorization_code', code: authCode,
          redirect_uri: redirectUri, code_verifier: codeVerifier,
        }),
      };
      try {
        const response = await fetch('https://accounts.spotify.com/api/token', payload);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Token request failed: ${response.statusText} - ${errorData.error_description || JSON.stringify(errorData)}`);
        }
        const tokenData = await response.json();
        localStorage.setItem('access_token', tokenData.access_token);
        setAccessToken(tokenData.access_token);
        window.history.replaceState({}, document.title, "/discography");
      } catch (err: any) {
        setError(`Error fetching token: ${err.message}`);
        setIsLoading(false);
      }
    };

    const existingToken = localStorage.getItem('access_token');
    if (existingToken) {
      setAccessToken(existingToken);
    } else if (code) {
      getToken(code);
    } else {
      setError('Not authorized.'); setIsLoading(false);
    }
  }, [searchParams]);

  // Player Initialization
  useEffect(() => {
    if (!accessToken || !isSdkReady || playerRef.current) return;
    const player = new window.Spotify.Player({
      name: 'Santyago Web Player',
      getOAuthToken: cb => { cb(accessToken); },
      volume: 0.5,
    });
    player.addListener('ready', ({ device_id }) => { deviceIdRef.current = device_id; });
    player.addListener('not_ready', ({ device_id }) => { if (deviceIdRef.current === device_id) deviceIdRef.current = null; });
    player.addListener('initialization_error', error => console.error('Init Error:', error.message));
    player.addListener('authentication_error', error => {
      console.error('Auth Error:', error.message);
      setError('Spotify auth error.'); setAccessToken(null); localStorage.removeItem('access_token');
    });
    player.addListener('account_error', error => console.error('Account Error:', error.message));
    player.addListener('player_state_changed', (state: Spotify.PlaybackState | null) => {
      if (!state) { setIsPlaying(false); setActivePlayerIndex(null); return; }
      setIsPlaying(!state.paused);
    });
    player.connect().then(success => {
      if (success) playerRef.current = player;
      else console.error('SDK connect failed.');
    });
    return () => { if (playerRef.current) { playerRef.current.disconnect(); playerRef.current = null; } };
  }, [accessToken, isSdkReady]);

  // Fetch Albums
  useEffect(() => {
    if (!accessToken || albums.length > 0) return;
    const artistId = '6WZx3OjQfZ8vjrd2MKSF1c';
    const fetchAlbumsData = async () => {
      setIsLoading(true); setError(null);
      try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=50&market=from_token`, {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        if (!response.ok) {
          if (response.status === 401) { localStorage.removeItem('access_token'); setAccessToken(null); throw new Error('Unauthorized.'); }
          throw new Error(`Failed to fetch albums: ${response.statusText}`);
        }
        const data = await response.json();
        const uniqueAlbums: AlbumItem[] = [];
        const albumNames = new Set<string>();
        data.items.forEach((album: AlbumItem) => { // Ensure album has uri property
          if (!albumNames.has(album.name)) {
            uniqueAlbums.push({ ...album, uri: `spotify:album:${album.id}` }); // Add uri here
            albumNames.add(album.name);
          }
        });
        setAlbums(uniqueAlbums);
      } catch (err: any) { setError(`Error fetching albums: ${err.message}`);
      } finally { setIsLoading(false); }
    };
    fetchAlbumsData();
  }, [accessToken, albums.length]);

  // handlePlayPause function (ensure album.uri is used for context_uri)
  const handlePlayPause = async (albumUri: string, index: number) => {
    if (!playerRef.current || !deviceIdRef.current) {
      setError('Player not ready.'); return;
    }
    const player = playerRef.current;
    try {
      const currentState = await player.getCurrentState();
      if (currentState && !currentState.paused && currentState.context.uri === albumUri) {
        await player.pause();
      } else {
        await player.play({ device_id: deviceIdRef.current, context_uri: albumUri });
      }
      // State update for isPlaying and activePlayerIndex is handled by 'player_state_changed' listener
      // For immediate UI feedback for the clicked item if state listener is slow:
      setActivePlayerIndex(index); // Visually mark this one, player_state_changed will confirm play state

    } catch (e: any) { setError(`Playback error: ${e.message}`); }
  };

  // redirectToSpotifyLogin function (remains largely the same)
  const redirectToSpotifyLogin = async () => {
    const generateRandomString = (length: number) => {
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let text = '';
      for (let i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    };
    const sha256 = async (plain: string) => await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(plain));
    const base64encode = (input: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(input))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    
    const codeVerifier = generateRandomString(64);
    localStorage.setItem('code_verifier', codeVerifier);
    const codeChallenge = base64encode(await sha256(codeVerifier));
    const clientId = 'b618d7a76b81445c8b2f2c3d914e703e';
    const redirectUri = process.env.NODE_ENV === 'production' ? 'https://santyago.io/discography' : 'http://localhost:3000/discography';
    const scope = 'user-read-playback-state user-modify-playback-state streaming user-read-email user-read-private';
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.search = new URLSearchParams({ response_type: 'code', client_id: clientId, scope, code_challenge_method: 'S256', code_challenge: codeChallenge, redirect_uri: redirectUri }).toString();
    window.location.href = authUrl.toString();
  };

  // Render logic for DiscographyContent
  if (isLoading && !albums.length && !error) return <div className="text-center p-5">Loading Spotify data...</div>;
  if (error && !accessToken) {
    return (
      <div className="text-center p-5">
        <p className="text-danger">{error}</p>
        <button onClick={redirectToSpotifyLogin} className="btn btn-success mt-3">Login with Spotify</button>
      </div>
    );
  }
  if (error) return <div className="text-center p-5 text-danger">Error: {error}</div>;
  if (!albums.length && !isLoading) return <div className="text-center p-5">No albums found.</div>;

  return (
    <>
      <div className="title-group mb-3">
        <h1 className="h2 mb-0">Discography</h1>
        {accessToken && deviceIdRef.current && <small className="text-success ms-2">Player Ready</small>}
        {accessToken && !deviceIdRef.current && <small className="text-warning ms-2">Player Connecting...</small>}
      </div>
      <div id="album-players" className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
        {albums.map((album, index) => (
          <div className="col" key={album.id + index}>
            <div className="player-item card h-100 bg-dark text-white" onClick={() => handlePlayPause(album.uri, index)}> {/* Use album.uri */} 
              <Image 
                src={album.images[0]?.url || '/images/default-album.png'} 
                alt={album.name} 
                width={300} height={300} 
                className="card-img-top background-image"
                priority={index < 10}
              />
              <div className="card-img-overlay d-flex justify-content-center align-items-center bg-dark bg-opacity-25">
                <Image 
                  src={isPlaying && activePlayerIndex === index ? "/images/pause.svg" : "/images/play.svg"} 
                  alt={isPlaying && activePlayerIndex === index ? "Pause" : "Play"} 
                  width={50} height={50} className="button-image"
                />
              </div>
              <div className="card-body p-2" style={{ minHeight: '5em' }}>
                <p className="card-text small mb-0" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>{album.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!accessToken && (
         <div className="text-center mt-4">
            <button onClick={redirectToSpotifyLogin} className="btn btn-lg btn-success">Login with Spotify to Play Music</button>
        </div>
      )}
    </>
  );
}

// Main page component that wraps DiscographyContent with Suspense and includes Sidebar logic
export default function DiscographyPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container-fluid">
      {/* Global Menu Toggle Button */}
      <button className="btn btn-primary menu-toggle-btn" onClick={toggleSidebar} aria-label="Toggle navigation">
        <i className={`bi ${isSidebarOpen ? 'bi-x' : 'bi-list'}`}></i>
      </button>

      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <SidebarBackdrop show={isSidebarOpen} onClick={toggleSidebar} />
      
      <div className="row align-items-start"> 
        <main className="main-wrapper py-4 px-md-4 border-start" style={{ width: '100%' }}>
          <Suspense fallback={<div className="text-center p-5">Loading page content...</div>}> {/* Suspense fallback */}
            <DiscographyContent />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
