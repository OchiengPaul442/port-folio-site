import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Link
              href="/"
              className="font-mono text-sm font-semibold text-[var(--color-text-primary)]"
            >
              paul.dev
            </Link>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              Software engineer in Kampala, Uganda.
              <br />
              Building AI tools and environmental data platforms.
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="https://github.com/OchiengPaul442"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors"
            >
              GitHub
            </a>
            <Link
              href="/contact"
              className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-[var(--color-border)] pt-6">
          <p className="font-mono text-xs text-[var(--color-text-tertiary)]">
            &copy; {new Date().getFullYear()} Paul Ochieng Levi. Built with Next.js &amp; Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
