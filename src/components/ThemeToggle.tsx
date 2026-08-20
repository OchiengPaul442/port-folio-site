'use client';

import { useRef, useCallback, useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animatingRef = useRef(false);

  const toggleTheme = useCallback(() => {
    if (animatingRef.current) return;
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const supportsViewTransition =
      typeof document !== 'undefined' && 'startViewTransition' in document;

    if (!supportsViewTransition || prefersReducedMotion) {
      setTheme(newTheme);
      return;
    }

    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    animatingRef.current = true;

    try {
      const transition = (document as Document & {
        startViewTransition: (cb: () => void) => {
          ready: Promise<void>;
          finished: Promise<void>;
          skipTransition: () => void;
        };
      }).startViewTransition(() => {
        setTheme(newTheme);
      });

      transition.ready
        .then(() => {
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
            },
          );
        })
        .catch(() => {
          setTheme(newTheme);
        })
        .finally(() => {
          window.setTimeout(() => {
            animatingRef.current = false;
          }, 600);
        });
    } catch {
      animatingRef.current = false;
      setTheme(newTheme);
    }
  }, [theme, setTheme]);

  if (!mounted) {
    return <div className="h-9 w-9 rounded-md" />;
  }

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-md p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span key={theme} className="theme-icon-pop inline-flex">
        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </span>
    </button>
  );
}
