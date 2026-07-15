import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Privacy policy for paul.dev',
};

export default function PrivacyPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Privacy Policy
        </h1>
        <p className="mt-2 font-mono text-sm text-[var(--color-text-tertiary)]">
          Last updated: July 2026
        </p>
        <div className="prose mt-8 max-w-none text-[var(--color-text-secondary)]">
          <p>
            This website is operated by Paul Ochieng Levi. This privacy policy
            explains how personal information is collected, used, and protected
            when you visit this website.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Information Collected</h2>
          <p>
            Contact form submissions: name, email, subject, and message content.
            This information is used solely to respond to your inquiry.
          </p>
          <p>
            This site does not use cookies, tracking pixels, or third-party
            analytics services. No browsing data is collected or shared.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Translation</h2>
          <p>
            The language control can open the current page through Google
            Translate. Translation is handled by Google&apos;s service; this website
            does not store your language choice or send page content through its
            own server for translation.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Data Storage</h2>
          <p>
            Contact form submissions are processed server-side and not stored
            long-term. No data is sold, shared, or used for marketing purposes.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">External Links</h2>
          <p>
            This site contains links to external platforms (GitHub, LinkedIn,
            Twitter). These platforms have their own privacy policies, and this
            site has no control over their data practices.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Contact</h2>
          <p>
            For privacy-related inquiries, contact via the form on the{' '}
            <a href="/contact" className="text-[var(--color-accent)] underline underline-offset-2">
              contact page
            </a>{' '}
            or email directly.
          </p>
        </div>
      </div>
    </section>
  );
}
