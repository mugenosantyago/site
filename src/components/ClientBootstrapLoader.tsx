'use client';

import { useEffect } from 'react';

export default function ClientBootstrapLoader() {
  useEffect(() => {
    // Dynamically import Bootstrap JS only on the client-side
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null; // This component doesn't render anything
} 