import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for paul.dev — how Paul Ochieng Levi collects, uses, and protects personal data on this portfolio website.',
  openGraph: {
    title: 'Privacy Policy | Paul Ochieng Levi',
    description: 'Privacy policy for paul.dev portfolio website.',
    url: 'https://paul.dev/privacy',
  },
  alternates: {
    canonical: 'https://paul.dev/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Privacy Policy
        </h1>
        <p className="mt-2 font-mono text-sm text-[var(--color-text-tertiary)]">
          Last updated: August 2026
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
            This information is used solely to respond to your inquiry. Messages
            are delivered through Resend as a transactional email provider and
            are not used for marketing.
          </p>
          <p>
            When configured, this site uses Google Analytics 4 to understand
            aggregate page visits and improve the portfolio. Google may process
            usage data through its analytics service. No form content is sent to
            Analytics.
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
            Contact form submissions are processed server-side and forwarded to
            paul.ochieng.dev@gmail.com. The portfolio does not persist them in
            its own database. No data is sold, shared, or used for marketing.
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
