'use client';

export function PrivacySettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('open-privacy-settings'))}
      className="hover:text-[var(--color-accent)] transition-colors duration-200"
    >
      Privacy settings
    </button>
  );
}
