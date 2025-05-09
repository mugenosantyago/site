'use client'; // Must be a client component to use hooks

import Sidebar from '@/components/Sidebar';
import VideoPlayerManager from '@/components/VideoPlayerManager';
import { useState } from 'react'; // Import useState

// A simple backdrop component
const SidebarBackdrop = ({ show, onClick }: { show: boolean; onClick: () => void }) => {
  return <div className={`sidebar-backdrop ${show ? 'show' : ''}`} onClick={onClick}></div>;
};

export default function VideosPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container-fluid">
      <VideoPlayerManager />

      {/* Global Menu Toggle Button - MOVED */}
      {/*
      <button className="btn btn-primary menu-toggle-btn" onClick={toggleSidebar} aria-label="Toggle navigation">
        <i className={`bi ${isSidebarOpen ? 'bi-x' : 'bi-list'}`}></i>
      </button>
      */}

      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <SidebarBackdrop show={isSidebarOpen} onClick={toggleSidebar} />

      <div className="row align-items-start">
        <main className="main-wrapper py-4 px-md-4 border-start" style={{ width: '100%' }}>
          {/* Global Menu Toggle Button - NEW POSITION */}
          <button className="btn btn-primary menu-toggle-btn" onClick={toggleSidebar} aria-label="Toggle navigation">
            <i className={`bi ${isSidebarOpen ? 'bi-x' : 'bi-list'}`}></i>
          </button>
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
                id="youtube-player-videos-1"
                src="https://www.youtube.com/embed/Vwg7o0NU0F8?si=RXdfevSQQnQ0N8l-&enablejsapi=1"
                title="YouTube video player - Daydream Vendetta - Vwg7o0NU0F8"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="responsive-video-iframe youtube-iframe"
              ></iframe>
            </div>
            {/* New Video y2vGBZ_oTIQ - second in Daydream Vendetta, to the right of the first */}
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe
                id="youtube-player-videos-2"
                src="https://www.youtube.com/embed/y2vGBZ_oTIQ?enablejsapi=1"
                title="YouTube video player - Daydream Vendetta - y2vGBZ_oTIQ"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="responsive-video-iframe youtube-iframe"
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
                id="youtube-player-videos-3"
                src="https://www.youtube.com/embed/yNeke20t6Jg?si=Hkclz2Y67hZHo_6v&enablejsapi=1"
                title="YouTube video player - MAYU - yNeke20t6Jg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="responsive-video-iframe youtube-iframe"
              ></iframe>
            </div>

            {/* Section: inbetween */}
            <div className="col-12 mt-4 mb-3">
              <h6>inbetween</h6>
            </div>
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe
                id="youtube-player-videos-4"
                src="https://www.youtube.com/embed/LvK_0hhU-NQ?si=tqpydgGeiU4lSlEM&enablejsapi=1"
                title="YouTube video player - LvK_0hhU-NQ"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="responsive-video-iframe youtube-iframe"
              ></iframe>
            </div>
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe
                id="youtube-player-videos-5"
                src="https://www.youtube.com/embed/wWUDMxkOE48?si=3SxyfC_hLReeevi7&enablejsapi=1"
                title="YouTube video player - wWUDMxkOE48"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="responsive-video-iframe youtube-iframe"
              ></iframe>
              <p className="mt-2"><strong>NIMBUS w/ WABAKI (mifune &amp; Matt Canino)</strong></p>
            </div>

            {/* Section: More Videos */}
            <div className="col-12 mt-4 mb-3">
              <h6>More Videos</h6>
            </div>
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe 
                id="youtube-player-videos-6"
                src="https://www.youtube.com/embed/gzp6DA3GVpA?enablejsapi=1"
                title="YouTube video player - gzp6DA3GVpA" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="responsive-video-iframe youtube-iframe">
              </iframe>
            </div>
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe 
                id="youtube-player-videos-7"
                src="https://www.youtube.com/embed/ZVvxoAwFUtg?enablejsapi=1"
                title="YouTube video player - ZVvxoAwFUtg" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="responsive-video-iframe youtube-iframe">
              </iframe>
            </div>
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe 
                id="youtube-player-videos-8"
                src="https://www.youtube.com/embed/kp8oVusqdCU?enablejsapi=1"
                title="YouTube video player - kp8oVusqdCU" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="responsive-video-iframe youtube-iframe">
              </iframe>
            </div>
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe 
                id="youtube-player-videos-9"
                src="https://www.youtube.com/embed/VyfxJmCPolE?enablejsapi=1"
                title="YouTube video player - VyfxJmCPolE" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="responsive-video-iframe youtube-iframe">
              </iframe>
            </div>
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe 
                id="youtube-player-videos-10"
                src="https://www.youtube.com/embed/z4eu4iycQHQ?enablejsapi=1"
                title="YouTube video player - z4eu4iycQHQ" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="responsive-video-iframe youtube-iframe">
              </iframe>
            </div>
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe 
                id="youtube-player-videos-11"
                src="https://www.youtube.com/embed/n5Q0jgDAz7Y?enablejsapi=1"
                title="YouTube video player - n5Q0jgDAz7Y" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="responsive-video-iframe youtube-iframe">
              </iframe>
            </div>
            <div className="col-md-6 col-lg-6 mb-4">
              <iframe 
                id="youtube-player-videos-12"
                src="https://www.youtube.com/embed/_ENQSfo8QrU?enablejsapi=1"
                title="YouTube video player - _ENQSfo8QrU" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="responsive-video-iframe youtube-iframe">
              </iframe>
            </div>

          </div>
          {/* Footer can be added here */}
        </main>
      </div>
    </div>
  );
} 