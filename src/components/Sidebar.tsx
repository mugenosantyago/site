'use client'; // Add this directive if using client-side hooks like usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // To determine active link

export default function Sidebar() {
  const pathname = usePathname(); // Get current path

  const navItems = [
    { href: '/', label: 'dreamland', icon: 'bi-house-fill' },
    // Point to the static authorization file in /public
    { href: '/authorization1.html', label: 'discography' }, 
    { href: '/videos', label: 'videos' }, // We'll create this page later
    { href: '/youtube', label: 'youtube' }, // Added YouTube page
    { href: '/contact', label: 'contact' }, // We'll create this page later
    { href: '/shop', label: 'shop' }, // We'll create this page later
  ];

  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-3 d-md-block sidebar"
    >
      <div className="position-sticky py-4 px-3 sidebar-sticky">
        <ul className="nav flex-column h-100">
          {navItems.map((item) => (
            <li className="nav-item" key={item.href}>
              {/* Use standard <a> for external/static html link, Link for internal Next routes */}
              {item.href.startsWith('/') && !item.href.endsWith('.html') ? (
                <Link
                  className={`nav-link ${pathname === item.href ? 'active' : ''}`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  href={item.href}
                  style={{ display: 'inline-block', width: '100%' }} // Ensure full width for consistent spacing
                >
                  {item.icon && <i className={`${item.icon} me-2`}></i>}
                  {item.label}
                 </Link>
              ) : (
                <a
                  className={`nav-link ${item.label === 'discography' ? (pathname.startsWith('/discography') ? 'active' : '') : ''}`}
                  href={item.href}
                  style={{ display: 'inline-block', width: '100%' }} // Ensure full width for consistent spacing
                > 
                  {item.icon && <i className={`${item.icon} me-2`}></i>}
                  {item.label}
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