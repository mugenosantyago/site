'use client'; // Must be a client component to use hooks

import Sidebar from '@/components/Sidebar';
import { useState } from 'react'; // Import useState

// A simple backdrop component (can be moved to a shared file if used in many places)
const SidebarBackdrop = ({ show, onClick }: { show: boolean; onClick: () => void }) => {
  return <div className={`sidebar-backdrop ${show ? 'show' : ''}`} onClick={onClick}></div>;
};

export default function ContactPage() {
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

      {/* Row and Main content adjustments */}
      <div className="row align-items-start"> {/* Retain align-items-start if desired */}
        <main className="main-wrapper py-4 px-md-4 border-start" style={{ width: '100%' }}> {/* Removed col classes, added width 100% */}
          <div className="title-group mb-3">
            <h1 className="h2 mb-0">Contact&nbsp;</h1>
          </div>

          <div className="row my-4">
            <div className="col-lg-12 col-12">
              <div className="custom-block bg-white">
                <h6 className="mb-4">&nbsp;mgmt@santyago.io</h6>
                <p>
                  <strong>&nbsp;</strong>
                  {/* Phone number link - consider if still desired */}
                  <a href="tel: 305-240-9671" className="ms-2">
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;for all inquiries
                  </a>
                </p>
              </div>
            </div>
             {/* Original had a copyright block here, often better in a shared footer */}
             {/* <div className="col-lg-5 col-12">
                <div className="custom-block custom-block-contact">
                   <h6 className="mb-4">(C) ROSE MUSIC CLUB 2023&nbsp;</h6>
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