import Sidebar from '@/components/Sidebar';

export default function VideosPage() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main className="main-wrapper col-md-9 ms-sm-auto py-4 col-lg-9 px-md-4 border-start">
          <div className="title-group mb-3">
            <h1 className="h2 mb-0">Videos</h1>
          </div>
          <div className="row my-4">
            {/* Content based on videos.html */}
            <div className="col-lg-7 col-12">
              <div className="custom-block custom-block-profile"> {/* Check if this class needs specific styling */}
                <div className="row">
                  <div className="col-lg-12 col-12 mb-3">
                    <h6>Daydream Vendetta</h6>
                  </div>
                  {/* Column structure from original, might need refactor */}
                  <div className="col-lg-3 col-12 mb-4 mb-lg-0"> 
                    <div>
                      <div className="col-lg-9 col-12"> {/* Nested cols? Review structure */}
                        <p className="d-flex flex-wrap mb-2">
                          <strong>
                            <iframe
                              width="500"
                              height="315"
                              src="https://www.youtube.com/embed/Vwg7o0NU0F8?si=RXdfevSQQnQ0N8l-"
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className="responsive-video-iframe"
                            ></iframe>
                          </strong>
                          <span>&nbsp;</span>
                        </p>
                        <p className="d-flex flex-wrap mb-2">
                          <strong>MAYU&nbsp;</strong>
                          <a href="#"> &nbsp; </a>
                        </p>
                        <p className="d-flex flex-wrap mb-2">
                          <strong>
                            <iframe
                              width="500"
                              height="315"
                              src="https://www.youtube.com/embed/yNeke20t6Jg?si=Hkclz2Y67hZHo_6v"
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className="responsive-video-iframe"
                            ></iframe>
                          </strong>
                          <a href="#"> &nbsp; </a>
                        </p>
                        <p className="d-flex flex-wrap mb-2">
                          <strong>
                            {/* Check if Google Drive embed works reliably/is desired */}
                            <iframe
                              src="https://drive.google.com/file/d/1PvTlMtF7PNpxr8uDdog8VSqVjP-rh2th/preview"
                              width="500" // Adjust width/height as needed
                              height="315"
                              allow="autoplay"
                              className="responsive-video-iframe"
                            ></iframe>
                          </strong>
                          <a href="#"> &nbsp; </a>
                        </p>
                         {/* Other empty paragraphs from original omitted */}
                      </div>
                    </div>
                  </div>

                  {/* inbetween Block */}
                  <div className="custom-block custom-block-profile bg-white">
                    <h6 className="mb-4">inbetween</h6>
                    <p className="d-flex flex-wrap mb-2">
                      <strong>
                        <iframe
                          width="500"
                          height="315"
                          src="https://www.youtube.com/embed/LvK_0hhU-NQ?si=tqpydgGeiU4lSlEM"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="responsive-video-iframe"
                        ></iframe>
                      </strong>
                      <span>&nbsp;</span>
                    </p>
                    {/* Empty paragraphs omitted */}
                    <p className="d-flex flex-wrap mb-2">
                      <strong>NIMBUS w/ WABAKI (mifune &amp; Matt Canino)</strong>
                      <span>&nbsp;</span>
                    </p>
                    <p className="d-flex flex-wrap mb-2">
                      <strong>
                        <iframe
                          width="500"
                          height="315"
                          src="https://www.youtube.com/embed/wWUDMxkOE48?si=3SxyfC_hLReeevi7"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="responsive-video-iframe"
                        ></iframe>
                      </strong>
                      <span>&nbsp;</span>
                    </p>
                    {/* Empty paragraphs omitted */}
                  </div>
                </div>

                {/* Copyright block from original? Seems misplaced here */}
                {/* <div className="col-lg-5 col-12">
                  <div className="custom-block custom-block-contact">
                    <h6 className="mb-4">(C) ROSE MUSIC CLUB 2023&nbsp;</h6>
                    <p><strong>&nbsp;</strong><a href="tel: 305-240-9671" className="ms-2"> &nbsp; </a></p>
                  </div>
                </div> */}
              </div>

              {/* New YouTube Embeds Section */}
              <div className="row mt-5">
                <div className="col-12 mb-3">
                  <h6>More Videos</h6>
                </div>
                {/* Video 1 */}
                <div className="col-lg-4 col-md-6 mb-4">
                  <iframe 
                    src="https://www.youtube.com/embed/gzp6DA3GVpA"
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="responsive-video-iframe">
                  </iframe>
                </div>
                {/* Video 2 */}
                <div className="col-lg-4 col-md-6 mb-4">
                  <iframe 
                    src="https://www.youtube.com/embed/ZVvxoAwFUtg"
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="responsive-video-iframe">
                  </iframe>
                </div>
                {/* Video 3 */}
                <div className="col-lg-4 col-md-6 mb-4">
                  <iframe 
                    src="https://www.youtube.com/embed/kp8oVusqdCU"
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="responsive-video-iframe">
                  </iframe>
                </div>
                {/* Video 4 */}
                <div className="col-lg-4 col-md-6 mb-4">
                  <iframe 
                    src="https://www.youtube.com/embed/VyfxJmCPolE"
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="responsive-video-iframe">
                  </iframe>
                </div>
                {/* Video 5 */}
                <div className="col-lg-4 col-md-6 mb-4">
                  <iframe 
                    src="https://www.youtube.com/embed/z4eu4iycQHQ"
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="responsive-video-iframe">
                  </iframe>
                </div>
                {/* Video 6 */}
                <div className="col-lg-4 col-md-6 mb-4">
                  <iframe 
                    src="https://www.youtube.com/embed/n5Q0jgDAz7Y"
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="responsive-video-iframe">
                  </iframe>
                </div>
                {/* Video 7 */}
                <div className="col-lg-4 col-md-6 mb-4">
                  <iframe 
                    src="https://www.youtube.com/embed/isofiKAfqcQ"
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="responsive-video-iframe">
                  </iframe>
                </div>
                {/* Video 8 */}
                <div className="col-lg-4 col-md-6 mb-4">
                  <iframe 
                    src="https://www.youtube.com/embed/_ENQSfo8QrU"
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="responsive-video-iframe">
                  </iframe>
                </div>
                {/* Playlist - Spanning full width for prominence or use col-lg-12 */}
                <div className="col-12 mb-4">
                  <h6 className="mt-4 mb-3">Playlist</h6>
                  <iframe 
                    src="https://www.youtube.com/embed/videoseries?list=PLgku7XgQ1eMbzUbfC_a2UhD3tQ8Ewc8gu"
                    title="YouTube playlist player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="responsive-video-iframe" 
                    style={{ minHeight: '400px' }} /* Playlists often need more height */>
                  </iframe>
                </div>
              </div>
            </div>
            {/* Potentially add right column if layout needs adjustment */}
          </div>
          {/* Footer can be added here */}
        </main>
      </div>
    </div>
  );
} 