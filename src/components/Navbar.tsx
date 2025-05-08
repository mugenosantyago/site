import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="navbar sticky-top flex-md-nowrap">
      {/* Original structure had this div, but it seems empty/commented out in parts?
          Adjust if needed based on original full design intent.
      <div className="col-md-3 col-lg-3 me-0 px-3 fs-6"> 
      </div>
      */}
      <Link className="navbar-brand col-md-3 col-lg-3 me-0 px-3 fs-6" href="/">
         サンチャゴ
      </Link>
      {/* Add Toggler button if sidebar needs to be collapsible on mobile */}
      {/* 
      <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button> 
      */}
    </header>
  );
} 