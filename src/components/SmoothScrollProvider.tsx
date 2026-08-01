'use client';

import { ReactLenis } from 'lenis/react';
import { type ReactNode, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const lenisRef = useRef<any>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const lenis = lenisRef.current;
    if (lenis?.lenis) {
      // Reset scroll position smoothly via Lenis
      lenis.lenis.scrollTo(0, { immediate: false, force: true });
    } else {
      // Fallback if Lenis isn't ready
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
