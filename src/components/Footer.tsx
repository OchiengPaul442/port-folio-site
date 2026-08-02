import Link from 'next/link';
import { PrivacySettingsButton } from '@/components/PrivacySettingsButton';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Link
              href="/"
              className="font-mono text-sm font-semibold text-[var(--color-text-primary)]"
            >
              ochiengpaul.com
            </Link>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              Software engineer in Kampala, Uganda.
              <br />
              Building thoughtful web products and dependable software systems.
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="https://github.com/OchiengPaul442"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              GitHub
            </a>
            <Link
              href="/contact"
              className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--color-text-tertiary)]">
          <Link href="/work" className="hover:text-[var(--color-accent)] transition-colors duration-200">Work</Link>
          <Link href="/about" className="hover:text-[var(--color-accent)] transition-colors duration-200">About</Link>
          <Link href="/now" className="hover:text-[var(--color-accent)] transition-colors duration-200">Now</Link>
          <Link href="/privacy" className="hover:text-[var(--color-accent)] transition-colors duration-200">Privacy</Link>
          <PrivacySettingsButton />
          <a href="https://www.linkedin.com/in/paulochieng442/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors duration-200">LinkedIn</a>
          <a href="https://twitter.com/OchiengTech" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors duration-200">Twitter</a>
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-[var(--color-text-tertiary)]">
            &copy; {new Date().getFullYear()} Paul Ochieng Levi.
          </p>
          <a
            href="#main-content"
            className="font-mono text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors duration-200"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
