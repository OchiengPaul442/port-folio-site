'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { BrandMark } from '@/components/BrandMark';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/now', label: 'Now' },
  { href: '/contact', label: 'Contact' },
];

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (mobileOpen) {
      firstMenuItemRef.current?.focus();
    }
  }, [mobileOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileOpen]);

  // Scroll-based hide/show
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = currentScrollY - lastScrollY.current;

          if (currentScrollY < 10) {
            setIsHidden(false);
          } else if (scrollDelta > 10) {
            setIsHidden(true);
          } else if (scrollDelta < -10) {
            setIsHidden(false);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/80 backdrop-blur-md transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
        role="navigation"
        aria-label="Main navigation"
        data-notranslate="true"
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            aria-label="Paul Ochieng Levi - Home"
          >
            <BrandMark className="h-8 w-8 shrink-0 text-[var(--color-accent)] transition-transform duration-300 group-hover:rotate-[-7deg]" />
            <span>ochiengpaul.com</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex" role="list">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
                    isActive(pathname, href)
                      ? 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                  aria-current={isActive(pathname, href) ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={`absolute right-0 top-0 h-full w-72 bg-[var(--color-bg-primary)] border-l border-[var(--color-border)] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-[var(--color-text-primary)]"
              onClick={() => setMobileOpen(false)}
            >
              <BrandMark className="h-7 w-7 shrink-0 text-[var(--color-accent)]" />
              <span>ochiengpaul.com</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center rounded-md p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="px-4 py-6">
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map(({ href, label }, index) => (
                <li key={href}>
                  <Link
                    ref={index === 0 ? firstMenuItemRef : undefined}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive(pathname, href)
                        ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
                    }`}
                    aria-current={isActive(pathname, href) ? 'page' : undefined}
                    style={{ transitionDelay: mobileOpen ? `${index * 50}ms` : '0ms' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Drawer footer */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-[var(--color-border)] px-6 py-4">
            <p className="font-mono text-xs text-[var(--color-text-tertiary)]">
              Kampala, Uganda
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
