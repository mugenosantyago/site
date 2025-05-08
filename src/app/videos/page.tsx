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
          
          {/* All Videos in a single responsive grid */}
          <div className="row my-4">

            {/* Section: Daydream Vendetta */}
            <div className="col-12 mb-3">
              <h6>Daydream Vendetta</h6>
            </div>
            {/* Video Vwg7o0NU0F8 - first in Daydream Vendetta */}
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe
                src="https://www.youtube.com/embed/Vwg7o0NU0F8?si=RXdfevSQQnQ0N8l-"
                title="YouTube video player - Daydream Vendetta - Vwg7o0NU0F8"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="responsive-video-iframe"
              ></iframe>
            </div>
            {/* New Video y2vGBZ_oTIQ - second in Daydream Vendetta, to the right of the first */}
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe
                src="https://www.youtube.com/embed/y2vGBZ_oTIQ"
                title="YouTube video player - Daydream Vendetta - y2vGBZ_oTIQ"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="responsive-video-iframe"
              ></iframe>
            </div>
            {/* Google Drive video - now third in Daydream Vendetta, starts new row */}
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe
                src="https://drive.google.com/file/d/1PvTlMtF7PNpxr8uDdog8VSqVjP-rh2th/preview"
                title="Google Drive preview - 1PvTlMtF7PNpxr8uDdog8VSqVjP-rh2th"
                allow="autoplay"
                className="responsive-video-iframe"
              ></iframe>
            </div>

            {/* Section: MAYU */}
            <div className="col-12 mt-4 mb-3"> 
              <h6>MAYU</h6>
            </div>
            {/* Video yNeke20t6Jg - should be under MAYU */}
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe
                src="https://www.youtube.com/embed/yNeke20t6Jg?si=Hkclz2Y67hZHo_6v"
                title="YouTube video player - MAYU - yNeke20t6Jg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="responsive-video-iframe"
              ></iframe>
            </div>

            {/* Section: inbetween */}
            <div className="col-12 mt-4 mb-3">
              <h6>inbetween</h6>
            </div>
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe
                src="https://www.youtube.com/embed/LvK_0hhU-NQ?si=tqpydgGeiU4lSlEM"
                title="YouTube video player - LvK_0hhU-NQ"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="responsive-video-iframe"
              ></iframe>
            </div>
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe
                src="https://www.youtube.com/embed/wWUDMxkOE48?si=3SxyfC_hLReeevi7"
                title="YouTube video player - wWUDMxkOE48"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="responsive-video-iframe"
              ></iframe>
              <p className="mt-2"><strong>NIMBUS w/ WABAKI (mifune &amp; Matt Canino)</strong></p>
            </div>

            {/* Section: More Videos */}
            <div className="col-12 mt-4 mb-3">
              <h6>More Videos</h6>
            </div>
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe 
                src="https://www.youtube.com/embed/gzp6DA3GVpA"
                title="YouTube video player - gzp6DA3GVpA" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="responsive-video-iframe">
              </iframe>
            </div>
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe 
                src="https://www.youtube.com/embed/ZVvxoAwFUtg"
                title="YouTube video player - ZVvxoAwFUtg" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="responsive-video-iframe">
              </iframe>
            </div>
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe 
                src="https://www.youtube.com/embed/kp8oVusqdCU"
                title="YouTube video player - kp8oVusqdCU" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="responsive-video-iframe">
              </iframe>
            </div>
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe 
                src="https://www.youtube.com/embed/VyfxJmCPolE"
                title="YouTube video player - VyfxJmCPolE" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="responsive-video-iframe">
              </iframe>
            </div>
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe 
                src="https://www.youtube.com/embed/z4eu4iycQHQ"
                title="YouTube video player - z4eu4iycQHQ" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="responsive-video-iframe">
              </iframe>
            </div>
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe 
                src="https://www.youtube.com/embed/n5Q0jgDAz7Y"
                title="YouTube video player - n5Q0jgDAz7Y" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="responsive-video-iframe">
              </iframe>
            </div>
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe 
                src="https://www.youtube.com/embed/_ENQSfo8QrU"
                title="YouTube video player - _ENQSfo8QrU" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="responsive-video-iframe">
              </iframe>
            </div>

          </div>
          {/* Footer can be added here */}
        </main>
      </div>
    </div>
  );
} 