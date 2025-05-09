'use client'; // Must be a client component to use hooks

import Sidebar from '@/components/Sidebar';
import { useState } from 'react'; // Import useState
// import Link from 'next/link'; // Import Link for external links too (optional, standard <a> is fine) Removed

// A simple backdrop component (can be moved to a shared file if used in many places)
const SidebarBackdrop = ({ show, onClick }: { show: boolean; onClick: () => void }) => {
  return <div className={`sidebar-backdrop ${show ? 'show' : ''}`} onClick={onClick}></div>;
};

export default function ShopPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container-fluid">
      {/* Global Menu Toggle Button - MOVED */}
      {/*
      <button className="btn btn-primary menu-toggle-btn" onClick={toggleSidebar} aria-label="Toggle navigation">
        <i className={`bi ${isSidebarOpen ? 'bi-x' : 'bi-list'}`}></i>
      </button>
      */}

      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <SidebarBackdrop show={isSidebarOpen} onClick={toggleSidebar} />

      {/* Row and Main content adjustments */}
      <div className="row align-items-start">
        <main className="main-wrapper py-4 px-md-4 border-start" style={{ width: '100%' }}>
          {/* Global Menu Toggle Button - NEW POSITION */}
          <button className="btn btn-primary menu-toggle-btn" onClick={toggleSidebar} aria-label="Toggle navigation">
            <i className={`bi ${isSidebarOpen ? 'bi-x' : 'bi-list'}`}></i>
          </button>
          <div className="title-group mb-3">
            <h1 className="h2 mb-0">shop</h1>
          </div>

          <div className="row my-4">
            <div className="col-lg-7 col-12">
              <div className="custom-block bg-white">
                {/* Use standard <a> for external link */}
                <a 
                  className="nav-link" // Keep class if styled
                  href="https://fauxofficial.gumroad.com/"
                  target="_blank" // Open external links in new tab
                  rel="noopener noreferrer" // Security best practice
                >
                  Click here to check out my gumroad
                </a>
              </div>
            </div>
            {/* Original had copyright block here as well */}
            {/* <div className="col-lg-5 col-12">
              <div className="custom-block custom-block-contact">
                <h6 className="mb-4">&nbsp;(C) ROSE MUSIC CLUB 2023</h6>
                <p><strong>&nbsp;</strong><a href="tel: 305-240-9671" className="ms-2"> &nbsp; </a></p>
              </div>
            </div> */}
          </div>
           {/* Footer potentially here */}
        </main>
      </div>
    </div>
  );
} 