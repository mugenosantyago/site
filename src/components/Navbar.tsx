import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="navbar sticky-top flex-md-nowrap">
      {/* Using flexbox utilities to space out content */}
      <div className="container-fluid d-flex align-items-center">
        {/* Keeping the brand link, adjust class if needed for spacing/styling */}
        <Link className="navbar-brand me-auto px-3 fs-6" href="/"> {/* Use me-auto to push to the right */}
           サンチャゴ
        </Link>
        {/* Add Toggler button if sidebar needs to be collapsible on mobile */}
        {/* 
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> 
        */}
      </div>
    </header>
  );
} 