'use client';

import { useEffect, useState } from 'react';

const CONSENT_KEY = 'privacy-analytics-consent';

function publishConsent(value: 'granted' | 'denied') {
  window.localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent('privacy-consent-changed'));
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => setVisible(!window.localStorage.getItem(CONSENT_KEY));
    const openSettings = () => setVisible(true);
    sync();
    window.addEventListener('open-privacy-settings', openSettings);
    return () => window.removeEventListener('open-privacy-settings', openSettings);
  }, []);

  if (!visible) return null;

  const choose = (value: 'granted' | 'denied') => {
    publishConsent(value);
    setVisible(false);
  };

  return (
    <aside
      role="dialog"
      aria-label="Privacy preferences"
      aria-describedby="privacy-consent-description"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-2xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/95 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:inset-x-6 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">Your privacy choices</h2>
          <p id="privacy-consent-description" className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-text-secondary)]">
            This site uses optional Google Analytics to understand visits and improve the portfolio. You can accept or reject analytics; the site and contact form work either way.{' '}
            <a href="/privacy" className="text-[var(--color-accent)] underline underline-offset-2">Read the privacy policy</a>.
          </p>
        </div>
        <div className="flex shrink-0 gap-2 sm:pt-1">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)]/50 hover:text-[var(--color-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            Reject optional
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="rounded-lg bg-[var(--color-accent)] px-3 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </aside>
  );
}
