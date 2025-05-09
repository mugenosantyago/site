'use client';

import { useEffect, useRef, useState } from 'react';

// Type declarations for YouTube IFrame API
declare global {
  interface Window {
    YT?: YT.Namespace; // Use YT.Namespace here
    onYouTubeIframeAPIReady?: () => void;
  }

  // Define the YT namespace and its members
  // Disabling the lint rule as this is a common way to declare types for global libraries like YT
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace YT {
    interface Player {
      playVideo: () => void;
      pauseVideo: () => void;
      getPlayerState: () => PlayerStateEnum; // Use PlayerStateEnum
      getIframe: () => HTMLIFrameElement;
      addEventListener: <E extends keyof PlayerEvents>(event: E, listener: PlayerEvents[E]) => void;
      removeEventListener: <E extends keyof PlayerEvents>(event: E, listener: PlayerEvents[E]) => void;
      destroy: () => void;
    }

    interface PlayerOptions {
      height?: string;
      width?: string;
      videoId?: string;
      playerVars?: PlayerVars;
      events?: Partial<PlayerEvents>;
    }

    // This enum provides the values for player states
    enum PlayerStateEnum {
      UNSTARTED = -1,
      ENDED = 0,
      PLAYING = 1,
      PAUSED = 2,
      BUFFERING = 3,
      CUED = 5,
    }

    interface PlayerEvents {
      onReady?: (event: PlayerEvent) => void;
      onStateChange?: (event: OnStateChangeEvent) => void;
      // Add other events like onError, onPlaybackQualityChange, etc.
    }

    interface PlayerEvent {
      target: Player;
    }

    interface OnStateChangeEvent extends PlayerEvent {
      data: PlayerStateEnum;
    }

    interface PlayerVars {
      autoplay?: 0 | 1;
      controls?: 0 | 1 | 2;
      enablejsapi?: 0 | 1;
      // Add other player vars as needed
    }
    
    // Define the shape of the global YT object itself
    interface Namespace {
        Player: new (frameId: string | HTMLElement, config: PlayerOptions) => Player;
        PlayerState: typeof PlayerStateEnum;
    }
  }
}

const VideoPlayerManager = () => {
  const [ytApiReady, setYtApiReady] = useState(false);
  const html5VideosRef = useRef<HTMLVideoElement[]>([]);
  const youtubePlayersRef = useRef<YT.Player[]>([]);
  const currentlyPlayingRef = useRef<HTMLVideoElement | YT.Player | null>(null);

  const pauseOthers = (currentPlaying: HTMLVideoElement | YT.Player) => {
    html5VideosRef.current.forEach(video => {
      if (video !== currentPlaying) {
        video.pause();
      }
    });
    youtubePlayersRef.current.forEach(player => {
      if (player !== currentPlaying) {
        if (player.getPlayerState && typeof player.getPlayerState === 'function' && 
            player.getPlayerState() === window.YT!.PlayerState.PLAYING) {
          player.pauseVideo();
        }
      }
    });
  };

  useEffect(() => {
    const videos = Array.from(document.querySelectorAll('video'));
    html5VideosRef.current = videos;

    const handleHtml5Play = (event: Event) => {
      const currentVideo = event.target as HTMLVideoElement;
      if (currentlyPlayingRef.current !== currentVideo) {
        if (window.YT && window.YT.PlayerState) { // Check if YT namespace and PlayerState are available
          pauseOthers(currentVideo);
        }
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
  }, []);

  useEffect(() => {
    if (window.YT && window.YT.Player) { // Check for YT.Player directly
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

    const originalOnReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      setYtApiReady(true);
      if (originalOnReady) {
        originalOnReady();
      }
    };
    return () => {
      // Restore original if it was ours, to prevent issues if component unmounts then API loads
      if (window.onYouTubeIframeAPIReady && originalOnReady && window.onYouTubeIframeAPIReady.toString() === originalOnReady.toString()) {
        //This check is a bit weak, might need a more robust way or just set to originalOnReady
      } else if (!originalOnReady) { // If there was no original, clear it
        window.onYouTubeIframeAPIReady = undefined;
      }
      // If originalOnReady existed and is different, it means something else set it, so leave it.
    };
  }, []);

  useEffect(() => {
    if (!ytApiReady || !window.YT || !window.YT.Player || !window.YT.PlayerState) return;

    const ytIframes = Array.from(document.querySelectorAll<HTMLIFrameElement>('.youtube-iframe'));
    const newPlayers: YT.Player[] = [];

    const onPlayerStateChange = (event: YT.OnStateChangeEvent, player: YT.Player) => {
      if (event.data === window.YT!.PlayerState.PLAYING) { // Use definite assignment for window.YT here
        if (currentlyPlayingRef.current !== player) {
          pauseOthers(player);
          currentlyPlayingRef.current = player;
        }
      }
    };

    ytIframes.forEach(iframe => {
      if (iframe.id && !youtubePlayersRef.current.some(p => p.getIframe().id === iframe.id)) {
        try {
          const player = new window.YT!.Player(iframe.id, { // Use definite assignment for window.YT here
            events: {
              onStateChange: (event: YT.OnStateChangeEvent) => onPlayerStateChange(event, player),
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

    return () => {
      // Optional: Destroy players when component unmounts
      // youtubePlayersRef.current.forEach(player => {
      //   if (player && typeof player.destroy === 'function') {
      //     try { player.destroy(); } catch (e) { console.warn("Error destroying YT player", e); }
      //   }
      // });
      // youtubePlayersRef.current = []; // Clear array if players are destroyed
    };
  }, [ytApiReady]);

  return null;
};

export default VideoPlayerManager; 