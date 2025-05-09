import Sidebar from '@/components/Sidebar';
import VideoPlayerManager from '@/components/VideoPlayerManager';

export default function YouTubePage() {
  const channelUploadsPlaylistId = "UUQ4G8mV1TMiDbEyuWK0cNzg"; // Derived from channel ID UCQ4G8mV1TMiDbEyuWK0cNzg

  return (
    <div className="container-fluid">
      <VideoPlayerManager />
      <div className="row">
        <Sidebar />
        <main className="main-wrapper col-md-9 ms-sm-auto py-4 col-lg-9 px-md-4 border-start">
          <div className="title-group mb-3">
            <h1 className="h2 mb-0">YouTube Channel Feed</h1>
          </div>
          
          <div className="row my-4">
            <div className="col-12">
              <p className="mb-4">
                Displaying the latest uploads from the channel. 
                You can also visit the channel directly on 
                <a 
                  href={`https://www.youtube.com/channel/${channelUploadsPlaylistId.replace(/^UU/, 'UC')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ marginLeft: '5px' }} // Added style for spacing
                >
                  YouTube.
                </a>
              </p>
              <iframe 
                id={`youtube-player-main-channel-uploads`}
                src={`https://www.youtube.com/embed/videoseries?list=${channelUploadsPlaylistId}&enablejsapi=1`}
                title="YouTube Channel Playlist"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="responsive-video-iframe youtube-iframe"
                style={{ minHeight: '500px' }} /* Playlist embeds often benefit from more height */
              >
              </iframe>
            </div>
          </div>

          {/* Curated Playlists Section */}
          <div className="row my-4">
            <div className="col-12">
              <h2 className="h4 mb-3">Curated Playlists</h2>
            </div>
            {[ 
              'OLAK5uy_mfdzObmPuwhwhVHGOotLtj5ROzT9OouQ0', 
              'OLAK5uy_mNUy__mdds4MWWevrF-fRYBNGXCmrF3eY', 
              'OLAK5uy_n096fTGweXxsN6P26MwjGmHdlAX7JOVWw', 
              'OLAK5uy_lkhPyRY6a1FqqbSuQRFuCW-fUQSyunEME', 
              'OLAK5uy_nNQpHyHgmCUC3XnbdyEX33sWYKhUlcnNY', 
              'OLAK5uy_mv5J-sj90_jh9B4zZ6h4BzL3NUMP3Q6iA', 
              'OLAK5uy_nluvwPB06vN4ULVQgErWbz7Cv1nG1IHVA', 
              'OLAK5uy_mxMhF4mBG_YZ6ytNMo5eZyp4EypP6VsTE',
              'OLAK5uy_nDxljmlSga4Vt79SbGsgj8ZxDGMDisaLE',
              'OLAK5uy_lSc2WPyvi3D9oaqA4E2goWNyvU8Qc1OeM',
              'OLAK5uy_llqhZMwVYOStZTlzd6jOuFvZoe2HxpKUg'
            ].map((playlistId, index) => (
              <div className="col-md-6 col-lg-6 mb-4" key={playlistId}>
                <iframe 
                  id={`youtube-player-playlist-${playlistId}`}
                  src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&enablejsapi=1`}
                  title={`YouTube Playlist - ${playlistId}`}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  className="responsive-video-iframe youtube-iframe"
                  style={{ minHeight: '350px' }} /* Adjust height as needed for these playlists */
                >
                </iframe>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
} 