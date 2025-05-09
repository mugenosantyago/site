'use client'; // Add this directive if using client-side hooks like usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // To determine active link

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname(); // Get current path

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
      className={`sidebar ${isOpen ? 'open' : ''}`} // Removed col classes, d-md-block. Uses .open for visibility.
    >
      <div className="position-sticky py-4 px-3 sidebar-sticky">
        {/* Simplified Toggle Button - primarily acts as a CLOSE button now inside the sidebar */}
        {/* This button could be styled as a prominent 'X' at the top of the sidebar */}
        <button 
          className="btn btn-link sidebar-toggler mb-3" // Simplified classes, always visible if sidebar is open
          onClick={onToggle} 
          aria-label="Close sidebar"
          // Icon changes to 'X' when open, or could always be 'X' as it's a close button now
        >
          <i className="bi bi-x-lg"></i> {/* Changed to X icon, bi-x-lg for larger X */}
        </button>
        
        {/* The d-md-none toggle button can be removed if we have a global toggle and this close button */}
        {/* For now, I am removing the mobile-specific toggle that was inside here */}

        <ul className="nav flex-column">
          {navItems.map((item) => (
            <li className="nav-item" key={item.href}>
              {item.href.startsWith('/') && !item.href.endsWith('.html') ? (
                <Link
                  className={`nav-link ${pathname === item.href ? 'active' : ''}`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  href={item.href}
                  title={item.label}
                  style={{ display: 'inline-block', width: '100%' }}
                  onClick={isOpen ? onToggle : undefined} // Optional: close sidebar on nav item click when open
                >
                  {item.icon && <i className={`${item.icon} me-2`}></i>} {/* Icon styling simplified, label always shown now */}
                  <span className="sidebar-item-label">{item.label}</span>
                 </Link>
              ) : (
                <a
                  className={`nav-link ${item.label === 'discography' ? (pathname.startsWith('/discography') ? 'active' : '') : ''}`}
                  href={item.href}
                  title={item.label}
                  style={{ display: 'inline-block', width: '100%' }}
                  onClick={isOpen ? onToggle : undefined} // Optional: close sidebar on nav item click when open
                > 
                  {item.icon && <i className={`${item.icon} me-2`}></i>} {/* Icon styling simplified */}
                  <span className="sidebar-item-label">{item.label}</span>
                 </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
} 