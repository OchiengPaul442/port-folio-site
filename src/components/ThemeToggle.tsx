'use client';

import { useRef, useCallback, useState, useSyncExternalStore, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const animatingTimerRef = useRef<number | null>(null);
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  useEffect(() => {
    return () => {
      if (animatingTimerRef.current) window.clearTimeout(animatingTimerRef.current);
    };
  }, []);

  const toggleTheme = useCallback((e: React.MouseEvent) => {
    if (isAnimating) return;

    const newTheme = theme === 'dark' ? 'light' : 'dark';

    // Get click position from the button
    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : e.clientX;
    const y = rect ? rect.top + rect.height / 2 : e.clientY;

    // Check for View Transition API support
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      setIsAnimating(true);

      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      // startViewTransition captures old state, runs callback, captures new state
      const transition = (document as Document & {
        startViewTransition: (callback: () => void) => { ready: Promise<void> };
      }).startViewTransition(() => {
        setTheme(newTheme);
      });

      // Animate the NEW state with circular clip-path reveal
      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );

        // Cleanup after animation
        animatingTimerRef.current = window.setTimeout(() => {
          setIsAnimating(false);
        }, 550);
      });
    } else {
      // Fallback: simple theme switch for unsupported browsers
      setTheme(newTheme);
    }
  }, [theme, setTheme, isAnimating]);

  if (!mounted) {
    return <div className="h-9 w-9 rounded-md" />;
  }

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      disabled={isAnimating}
      className="inline-flex items-center justify-center rounded-md p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] disabled:opacity-50"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
