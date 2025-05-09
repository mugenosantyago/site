'use client'; // Add this directive if using client-side hooks like usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // To determine active link
import { useState } from 'react'; // Import useState

export default function Sidebar() {
  const pathname = usePathname(); // Get current path
  const [isCollapsed, setIsCollapsed] = useState(false); // Add collapsed state

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { href: '/', label: 'dreamland', icon: 'bi-house-fill' },
    // Point to the static authorization file in /public
    { href: '/authorization1.html', label: 'discography', icon: 'bi-music-note-beamed' }, 
    { href: '/videos', label: 'videos', icon: 'bi-camera-video-fill' }, // We'll create this page later
    { href: '/youtube', label: 'youtube', icon: 'bi-youtube' }, // Added YouTube page
    { href: '/contact', label: 'contact', icon: 'bi-envelope-fill' }, // We'll create this page later
    { href: '/shop', label: 'shop', icon: 'bi-cart-fill' }, // We'll create this page later
  ];

  return (
    <nav
      id="sidebarMenu"
      className={`col-md-3 col-lg-3 d-md-block sidebar ${isCollapsed ? 'collapsed' : ''}`}
    >
      <div className="position-sticky py-4 px-3 sidebar-sticky">
        {/* Toggle Button */}
        <button 
          className="btn btn-link d-md-none mb-3" // Hide on md and larger screens initially, shown on mobile
          onClick={toggleSidebar} 
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!isCollapsed}
        >
          <i className={isCollapsed ? "bi bi-list" : "bi bi-x"}></i>
        </button>
        {/* Sidebar Toggle for larger screens - styled differently */}
        <button 
            className="btn btn-outline-secondary d-none d-md-block position-absolute top-0 end-0 m-2 sidebar-toggler"
            onClick={toggleSidebar}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!isCollapsed}
            style={{ zIndex: 1050 }} // Ensure it's above other elements
        >
            <i className={isCollapsed ? "bi bi-arrow-right-short" : "bi bi-arrow-left-short"}></i>
        </button>

        <ul className="nav flex-column h-100">
          {navItems.map((item) => (
            <li className="nav-item" key={item.href}>
              {/* Use standard <a> for external/static html link, Link for internal Next routes */}
              {item.href.startsWith('/') && !item.href.endsWith('.html') ? (
                <Link
                  className={`nav-link ${pathname === item.href ? 'active' : ''}`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  href={item.href}
                  title={item.label} // Add title for tooltip when collapsed
                  style={{ display: 'inline-block', width: '100%' }} // Ensure full width for consistent spacing
                >
                  {item.icon && <i className={`${item.icon} ${isCollapsed ? 'fs-4' : 'me-2'}`}></i>}
                  {!isCollapsed && <span className="sidebar-item-label">{item.label}</span>}
                 </Link>
              ) : (
                <a
                  className={`nav-link ${item.label === 'discography' ? (pathname.startsWith('/discography') ? 'active' : '') : ''}`}
                  href={item.href}
                  title={item.label} // Add title for tooltip when collapsed
                  style={{ display: 'inline-block', width: '100%' }} // Ensure full width for consistent spacing
                > 
                  {item.icon && <i className={`${item.icon} ${isCollapsed ? 'fs-4' : 'me-2'}`}></i>}
                  {!isCollapsed && <span className="sidebar-item-label">{item.label}</span>}
                 </a>
              )}
            </li>
          ))}
          {/* Original template had an empty item at the bottom, maybe for spacing/logout? Omitted for now. */}
          {/* 
          <li className="nav-item border-top mt-auto pt-2">
            <a className="nav-link" href="#"> </a>
          </li> 
          */}
        </ul>
      </div>
    </nav>
  );
} 