'use client';

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from 'react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
  { code: 'lg', name: 'Luganda', flag: '🇺🇬' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
];

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (options: Record<string, unknown>, container: string | HTMLElement) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const getStoredLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  const saved = window.localStorage.getItem('preferred-language');
  return saved && languages.some((language) => language.code === saved) ? saved : 'en';
};

const subscribeToLanguage = () => () => undefined;

export function LanguageSelector() {
  const currentLang = useSyncExternalStore(subscribeToLanguage, getStoredLanguage, () => 'en');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const initAttempted = useRef(false);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const loadGoogleTranslate = useCallback(() => {
    // Define the init callback globally
    window.googleTranslateElementInit = () => {
      if (!widgetRef.current || initAttempted.current) return;
      const TranslateClass = window.google?.translate?.TranslateElement;
      if (!TranslateClass) return;

      try {
        new TranslateClass(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,lg,sw,fr,es,ja,zh-CN',
            layout: 'SIMPLE',
            autoDisplay: false,
          },
          widgetRef.current
        );
        initAttempted.current = true;
      } catch {
        // Silent fail
      }
    };

    if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit?.();
      return;
    }

    if (document.getElementById('google-translate-script')) return;

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (currentLang !== 'en') loadGoogleTranslate();
  }, [currentLang, loadGoogleTranslate]);

  const handleLanguageChange = useCallback((lang: Language) => {
    setIsOpen(false);
    localStorage.setItem('preferred-language', lang.code);

    // Google Translate reads this cookie on page load. This avoids racing the
    // widget's asynchronously-created select element.
    if (lang.code === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
    } else {
      document.cookie = `googtrans=/en/${lang.code}; path=/; max-age=31536000; SameSite=Lax`;
    }
    window.location.reload();
  }, []);

  const current = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <>
      {/* Hidden Google Translate widget: must be in DOM but invisible */}
      <div
        ref={widgetRef}
        className="fixed bottom-0 left-0 z-[1] overflow-hidden"
        style={{
          height: '1px',
          width: '1px',
          opacity: 0.01,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Custom language selector */}
      <div ref={containerRef} className="language-selector-root" data-notranslate="true">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/90 backdrop-blur-md px-3 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] shadow-lg transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-text-primary)] hover:shadow-xl hover:shadow-[var(--color-accent)]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            aria-label={`Language: ${current.name}`}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
            <span className="hidden sm:inline">{current.name}</span>
            <svg
              className={`h-3 w-3 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {isOpen && (
            <div
              role="listbox"
              aria-label="Select language"
              className="language-selector-menu absolute bottom-full right-0 mb-2 min-w-[160px] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/95 backdrop-blur-xl shadow-2xl shadow-black/20 animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={currentLang === lang.code}
                  onClick={() => handleLanguageChange(lang)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                    currentLang === lang.code
                      ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span>{lang.name}</span>
                  {currentLang === lang.code && (
                    <svg className="ml-auto h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
