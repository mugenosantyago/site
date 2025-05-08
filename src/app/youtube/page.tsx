import Sidebar from '@/components/Sidebar';

export default function YouTubePage() {
  const channelUploadsPlaylistId = "UUQ4G8mV1TMiDbEyuWK0cNzg"; // Derived from channel ID UCQ4G8mV1TMiDbEyuWK0cNzg

  return (
    <div className="container-fluid">
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
                src={`https://www.youtube.com/embed/videoseries?list=${channelUploadsPlaylistId}`}
                title="YouTube Channel Playlist"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="responsive-video-iframe" 
                style={{ minHeight: '500px' }} /* Playlist embeds often benefit from more height */
              >
              </iframe>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 