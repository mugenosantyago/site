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
    { href: '/', label: 'dreamland' },
    { href: '/authorization1.html', label: 'discography' }, 
    { href: '/videos', label: 'videos' },
    { href: '/youtube', label: 'youtube' },
    { href: '/contact', label: 'contact' },
    { href: '/shop', label: 'shop' },
  ];

  return (
    <nav
      id="sidebarMenu"
      className={`sidebar ${isOpen ? 'open' : ''}`}
    >
      <div className="position-sticky py-4 px-3 sidebar-sticky">
        {/* Modern close button */}
        <button 
          className="btn btn-link sidebar-close-btn mb-4" 
          onClick={onToggle} 
          aria-label="Close sidebar"
        >
          <span className="close-icon">&times;</span>
        </button>

        <ul className="nav flex-column modern-nav">
          {navItems.map((item) => (
            <li className="nav-item" key={item.href}>
              {item.href.startsWith('/') && !item.href.endsWith('.html') ? (
                <Link
                  className={`nav-link modern-nav-link ${pathname === item.href ? 'active' : ''}`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  href={item.href}
                  onClick={isOpen ? onToggle : undefined}
                >
                  <span className="nav-text">{item.label}</span>
                </Link>
              ) : (
                <a
                  className={`nav-link modern-nav-link ${item.label === 'discography' ? (pathname.startsWith('/discography') ? 'active' : '') : ''}`}
                  href={item.href}
                  onClick={isOpen ? onToggle : undefined}
                > 
                  <span className="nav-text">{item.label}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
} 