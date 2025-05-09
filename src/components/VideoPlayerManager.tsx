'use client';

import { useEffect, useRef, useState } from 'react';

// Type declarations for YouTube IFrame API
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
  const YT: {
    Player: new (frameId: string | HTMLElement, config: YT.PlayerOptions) => YT.Player;
    PlayerState: {
      PLAYING: number;
      PAUSED: number;
      ENDED: number;
    };
  };
  namespace YT {
    interface Player {
      playVideo: () => void;
      pauseVideo: () => void;
      getPlayerState: () => number;
      getIframe: () => HTMLIFrameElement;
      addEventListener: (event: string, listener: (event: any) => void) => void;
      removeEventListener: (event: string, listener: (event: any) => void) => void;
      destroy: () => void;
    }
    interface PlayerOptions {
      height?: string;
      width?: string;
      videoId?: string;
      events?: {
        [eventType: string]: (event: any) => void;
      };
    }
  }
}

const VideoPlayerManager = () => {
  const [ytApiReady, setYtApiReady] = useState(false);
  const html5VideosRef = useRef<HTMLVideoElement[]>([]);
  const youtubePlayersRef = useRef<YT.Player[]>([]);
  const currentlyPlayingRef = useRef<HTMLVideoElement | YT.Player | null>(null);

  // Function to pause all other videos/players
  const pauseOthers = (currentPlaying: HTMLVideoElement | YT.Player) => {
    html5VideosRef.current.forEach(video => {
      if (video !== currentPlaying) {
        video.pause();
      }
    });
    youtubePlayersRef.current.forEach(player => {
      // Check if player and getIframe exist before comparing
      if (player && player.getIframe && player.getIframe() !== (currentPlaying as YT.Player)?.getIframe()) {
        if (player.getPlayerState && player.getPlayerState() === window.YT.PlayerState.PLAYING) {
          player.pauseVideo();
        }
      }
    });
  };

  // Initialize HTML5 video listeners
  useEffect(() => {
    const videos = Array.from(document.querySelectorAll('video'));
    html5VideosRef.current = videos;

    const handleHtml5Play = (event: Event) => {
      const currentVideo = event.target as HTMLVideoElement;
      if (currentlyPlayingRef.current !== currentVideo) {
        pauseOthers(currentVideo);
        currentlyPlayingRef.current = currentVideo;
      }
    };

    videos.forEach(video => {
      video.addEventListener('play', handleHtml5Play);
    });

    return () => {
      videos.forEach(video => {
        video.removeEventListener('play', handleHtml5Play);
      });
    };
  }, []); // Re-run if videos change, though unlikely without full re-render

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setYtApiReady(true);
      return;
    }

    const existingScript = document.getElementById('youtube-iframe-api');
    if (!existingScript) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Ensure onYouTubeIframeAPIReady is globally available and handles multiple calls
    const previousReadyCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      setYtApiReady(true);
      if (previousReadyCallback) {
        previousReadyCallback();
      }
    };
    
    // Cleanup: restore previous callback if component unmounts before API ready
    return () => {
        if (window.onYouTubeIframeAPIReady && window.onYouTubeIframeAPIReady.toString() === previousReadyCallback?.toString()) {
            window.onYouTubeIframeAPIReady = previousReadyCallback;
        }
    }

  }, []);

  // Initialize YouTube players when API is ready
  useEffect(() => {
    if (!ytApiReady) return;

    const ytIframes = Array.from(document.querySelectorAll<HTMLIFrameElement>('.youtube-iframe'));
    const newPlayers: YT.Player[] = [];

    const onPlayerStateChange = (event: any, player: YT.Player) => {
      // event.data is the new player state
      if (event.data === window.YT.PlayerState.PLAYING) {
        if (currentlyPlayingRef.current !== player) {
          pauseOthers(player);
          currentlyPlayingRef.current = player;
        }
      }
    };

    ytIframes.forEach(iframe => {
      if (iframe.id && !youtubePlayersRef.current.find(p => p.getIframe().id === iframe.id)) {
        try {
            const player = new window.YT.Player(iframe.id, {
              events: {
                'onStateChange': (event: any) => onPlayerStateChange(event, player),
              },
            });
            newPlayers.push(player);
        } catch (error) {
            console.error("Error creating YouTube player for iframe:", iframe.id, error);
        }
      }
    });

    if (newPlayers.length > 0) {
        youtubePlayersRef.current = [...youtubePlayersRef.current, ...newPlayers];
    }
    
    // No specific cleanup for individual players here as they are managed by the YT API itself.
    // We just clear our reference array if the component unmounts.
    return () => {
        // Optional: If you want to destroy players when the manager unmounts
        // youtubePlayersRef.current.forEach(player => {
        //     try {
        //         if (player && typeof player.destroy === 'function') {
        //             player.destroy();
        //         }
        //     } catch (e) {
        //         console.warn("Error destroying YouTube player:", e);
        //     }
        // });
        // youtubePlayersRef.current = [];
    };

  }, [ytApiReady]); // Re-run when API is ready

  return null; // This component does not render anything itself
};

export default VideoPlayerManager; 