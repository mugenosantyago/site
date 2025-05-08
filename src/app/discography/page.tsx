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
}

// Wrap the component that uses useSearchParams with Suspense
function DiscographyContent() {
  const searchParams = useSearchParams();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [albums, setAlbums] = useState<AlbumItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentAlbum, setCurrentAlbum] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePlayerIndex, setActivePlayerIndex] = useState<number | null>(null);

  const playerRef = useRef<Spotify.Player | null>(null);
  const deviceIdRef = useRef<string | null>(null);
  const sdkReady = useRef(false); // Flag to track SDK readiness
  const [isSdkReady, setIsSdkReady] = useState(false); // State to trigger effects dependent on SDK

  // --- 1. Spotify SDK Loading Hook ---
  useEffect(() => {
    if (window.Spotify) {
      console.log("Spotify SDK already loaded.");
      sdkReady.current = true;
      setIsSdkReady(true);
      return;
    }
    
    // Store the original callback if it exists
    const originalCallback = window.onSpotifyWebPlaybackSDKReady;

    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log('Spotify SDK is ready.');
      sdkReady.current = true;
      setIsSdkReady(true);
       // Call original callback if it existed
      // if (originalCallback) {
      //   originalCallback();
      // }
    };

    const script = document.getElementById('spotify-sdk-script');
    if (!script) {
        console.log("Attempting to load Spotify SDK script...");
        const newScript = document.createElement('script');
        newScript.id = 'spotify-sdk-script';
        newScript.src = 'https://sdk.scdn.co/spotify-player.js';
        newScript.async = true;
        document.body.appendChild(newScript);
    } 

    // Cleanup function to restore original callback
    // return () => { window.onSpotifyWebPlaybackSDKReady = originalCallback; }; 

  }, []);

  // --- 2. Authorization Flow --- 
  useEffect(() => {
    const code = searchParams.get('code');
    console.log('Auth code from URL:', code);

    const clientId = 'b618d7a76b81445c8b2f2c3d914e703e'; // Keep your client ID
    // IMPORTANT: Update this redirect URI to match your Vercel deployment or local setup
    // It MUST match the one registered in your Spotify Developer Dashboard
    const redirectUri = process.env.NODE_ENV === 'production' 
                          ? 'https://santyago.io/discography' // Use actual domain from original code
                          : 'http://localhost:3000/discography'; 

    const getToken = async (authCode: string) => {
      const codeVerifier = localStorage.getItem('code_verifier');
      if (!codeVerifier) {
        setError('Code verifier not found in local storage.');
        setIsLoading(false);
        return;
      }

      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: 'authorization_code',
          code: authCode,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
      };

      try {
        console.log('Requesting token with code:', authCode);
        const response = await fetch('https://accounts.spotify.com/api/token', payload);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Token request failed: ${response.statusText} - ${errorData.error_description || JSON.stringify(errorData)}`);
        }
        const tokenData = await response.json();
        console.log('Token received:', tokenData);
        localStorage.setItem('access_token', tokenData.access_token);
        // Optionally store refresh token and expiry time
        setAccessToken(tokenData.access_token);
        // Clear code from URL
        window.history.replaceState({}, document.title, "/discography"); 
      } catch (err: any) {
        console.error('Error fetching token:', err);
        setError(`Error fetching token: ${err.message}`);
        setIsLoading(false);
      }
    };

    // Check for existing token first
    const existingToken = localStorage.getItem('access_token');
    if (existingToken) {
      console.log('Found existing token in local storage.');
      setAccessToken(existingToken);
      // Need logic here to check if token is expired and refresh if necessary
    } else if (code) {
      console.log('No existing token, using auth code from URL.');
      getToken(code);
    } else {
      console.log('No token and no auth code.');
      // Redirect to authorization initiation page/route if desired
      // For now, we just show an error or a "Login" button
      setError('Not authorized. Please initiate Spotify login.'); // Placeholder error
      setIsLoading(false);
    }
  }, [searchParams]); // Re-run if searchParams change

  // --- 3. Player Initialization --- 
  useEffect(() => {
    if (!accessToken || !isSdkReady) return; 
    if (playerRef.current) return; 

    console.log('Initializing Spotify Player with token:', accessToken);
    // Use window.Spotify explicitly if needed
    const player = new window.Spotify.Player({
      name: 'Santyago Web Player',
      getOAuthToken: (cb: (token: string) => void) => { // Explicitly type cb
        // Check if token needs refreshing here?
        cb(accessToken);
      },
      volume: 0.5,
    });

    player.addListener('ready', ({ device_id }: { device_id: string }) => { // Explicitly type payload
      console.log('Player Ready with Device ID', device_id);
      deviceIdRef.current = device_id;
    });

    player.addListener('not_ready', ({ device_id }: { device_id: string }) => { // Explicitly type payload
      console.log('Device ID has gone offline', device_id);
      if (deviceIdRef.current === device_id) {
        deviceIdRef.current = null;
      }
    });

    // Use Spotify types for errors if available
    player.addListener('initialization_error', (error: Spotify.Error) => console.error('Init Error:', error.message));
    player.addListener('authentication_error', (error: Spotify.Error) => {
      console.error('Auth Error:', error.message);
      setError('Spotify authentication error. Please login again.');
      setAccessToken(null);
      localStorage.removeItem('access_token');
      // Handle re-authentication flow
    });
    player.addListener('account_error', (error: Spotify.Error) => console.error('Account Error:', error.message));
    
    // Listener for playback state changes - Use PlaybackState
    player.addListener('player_state_changed', (state: Spotify.PlaybackState | null) => { // Correct type
        if (!state) {
            setIsPlaying(false);
            setActivePlayerIndex(null);
            setCurrentAlbum(null);
            return;
        }
        setIsPlaying(!state.paused);
        console.log('Player state changed:', state);
     });

    player.connect().then((success: boolean) => { // Explicitly type success
      if (success) {
        console.log('The Web Playback SDK successfully connected to Spotify!');
        playerRef.current = player; // Store player instance
      } else {
        console.error('The Web Playback SDK failed to connect.');
      }
    });

    // Cleanup function to disconnect player on component unmount
    return () => {
      console.log('Disconnecting player...');
      if(playerRef.current) {
        playerRef.current.disconnect();
        playerRef.current = null;
      }
    };

  }, [accessToken, isSdkReady]); // Depend on token and SDK readiness

  // --- 4. Fetch Albums --- 
  useEffect(() => {
    // Fetch only if we have a token and haven't fetched yet
    if (!accessToken || albums.length > 0) return;

    const artistId = '6WZx3OjQfZ8vjrd2MKSF1c'; // Keep original artist ID
    const fetchAlbums = async () => {
      console.log('Fetching albums...');
      setIsLoading(true);
      setError(null);
      try {
        // Added market=from_token for better results based on user country
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=50&market=from_token`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          if (response.status === 401) { // Token expired or invalid
             localStorage.removeItem('access_token');
             setAccessToken(null); // Clear invalid token
             throw new Error('Unauthorized (Token expired or invalid). Please login again.');
          }
          throw new Error(`Failed to fetch albums: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Albums received:', data.items);
        // Filter out duplicates by name (Spotify API sometimes returns duplicates)
        const uniqueAlbums = data.items.reduce((acc: AlbumItem[], current: AlbumItem) => {
            if (!acc.find(item => item.name === current.name)) {
                acc.push(current);
            }
            return acc;
        }, []);
        setAlbums(uniqueAlbums || []); 
      } catch (err: any) {
        console.error('Error fetching albums:', err);
        setError(`Error fetching albums: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbums();

  }, [accessToken, albums.length]); // Depend on token and whether albums are already loaded

  // --- 5. Playback Logic --- 
  const handlePlayPause = async (albumId: string, index: number) => {
    if (!deviceIdRef.current || !accessToken) {
      console.error('No device ID or no token');
      setError('Player not available or not authorized. Please ensure Spotify is active and you are logged in.');
      return;
    }
    
    const albumContextUri = `spotify:album:${albumId}`;

    const playEndpoint = 'https://api.spotify.com/v1/me/player/play?device_id=' + deviceIdRef.current;
    const pauseEndpoint = 'https://api.spotify.com/v1/me/player/pause?device_id=' + deviceIdRef.current;
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    try {
      // Check current playback state (more reliable than local isPlaying toggle)
      const stateRes = await fetch('https://api.spotify.com/v1/me/player', { headers });
      let currentlyPlaying = false;
      let currentContextUri: string | null = null;
      if (stateRes.status === 200) {
          const stateData = await stateRes.json();
          currentlyPlaying = stateData?.is_playing;
          currentContextUri = stateData?.context?.uri;
      } else if (stateRes.status !== 204) { // 204 No Content is okay (no active device)
           throw new Error(`Failed to get player state: ${stateRes.statusText}`);
      }

      if (currentContextUri === albumContextUri && currentlyPlaying) {
        // Currently playing this album - PAUSE
        console.log('Pausing track via Web API');
        const res = await fetch(pauseEndpoint, { method: 'PUT', headers });
        if (!res.ok && res.status !== 404) throw new Error(`Pause API failed: ${res.statusText}`);
        setIsPlaying(false);
        setActivePlayerIndex(null);
      } else {
        // Either different album, or same album but paused - PLAY
        console.log(`Playing ${currentContextUri === albumContextUri ? 'paused' : 'new'} album via Web API:`, albumContextUri);
        const res = await fetch(playEndpoint, {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            context_uri: albumContextUri,
            offset: { position: 0 },
            position_ms: 0,
          }),
        });
        if (!res.ok && res.status !== 404) throw new Error(`Play API failed: ${res.statusText}`);
        setCurrentAlbum(albumId);
        setIsPlaying(true);
        setActivePlayerIndex(index);
      }
    } catch (err: any) {
      console.error('Playback error:', err);
      setError(`Playback error: ${err.message}`);
       if (err.message.includes('Unauthorized')) {
            localStorage.removeItem('access_token');
            setAccessToken(null);
            setError('Authorization error. Please login again.');
        }
    }
  };

  // --- Render Logic --- 
  let content;
  if (isLoading && albums.length === 0) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p className="text-danger">Error: {error}</p>;
    // Optionally add a login button here if error indicates lack of auth
  } else if (albums.length === 0 && !isLoading) {
    content = <p>No albums found for this artist.</p>;
  } else {
    content = albums.map((album, index) => (
      <div 
        key={album.id} 
        className="player-item" 
        onClick={() => handlePlayPause(album.id, index)}
      >
        <Image
          src={album.images[0]?.url || '/placeholder-image.png'} // Fallback image
          alt={album.name}
          width={180} // Match CSS minmax size? 
          height={180}
          className="background-image"
          priority={index < 10} // Prioritize loading first few images
        />
        {/* Conditional Play/Pause Button */}
        <Image 
            src={isPlaying && activePlayerIndex === index ? "/images/pause.svg" : "/images/play.svg"}
            alt={isPlaying && activePlayerIndex === index ? "Pause" : "Play"}
            width={50}
            height={50}
            className="button-image"
            unoptimized // SVGs generally don't need optimization
        />
      </div>
    ));
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main className="main-wrapper col-md-9 ms-sm-auto py-4 col-lg-9 px-md-4 border-start">
          <div className="title-group mb-3">
            <h1 className="h2 mb-0">Discography</h1>
          </div>
          <div className="row my-4">
            <div className="col-lg-12 col-12">
              <div className="custom-block bg-white">
                <h5 className="mb-4">Music</h5>
                <div className="table-responsive">
                  {/* Render albums or loading/error state */}
                  <div id="album-players">
                    {content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Wrap with Suspense because useSearchParams is used
export default function DiscographyPage() {
    return (
        <Suspense fallback={<div>Loading page...</div>}> {/* Simple fallback */}
            <DiscographyContent />
        </Suspense>
    );
} 