import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

const exceedsProfileUrl = 'https://myteam.exceeds.ai/profile/ochiengpaul442';

export const metadata: Metadata = {
  title: 'Engineering Profile',
  description:
    'Public engineering profile for Paul Ochieng Levi, including selected software engineering work and professional activity signals.',
  openGraph: {
    title: `Engineering Profile | ${SITE_NAME}`,
    description: 'A source-linked overview of Paul Ochieng Levi’s engineering practice and public work.',
    url: '/engineering',
  },
  alternates: { canonical: '/engineering' },
};

export default function EngineeringPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="max-w-2xl">
          <p className="section-label">Engineering profile</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
            How I work, measured in public.
          </h1>
          <p className="mt-5 text-base leading-7 text-[var(--color-text-secondary)]">
            This page brings together a small amount of source-linked context about my engineering practice. It complements the project case studies and public GitHub activity without replacing them.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="card">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">Public work</p>
            <h2 className="mt-3 text-xl font-semibold text-[var(--color-text-primary)]">Products over vanity metrics</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
              The strongest evidence is shipped work: interfaces, APIs, data systems, developer tools, and contributions that solve a real problem.
            </p>
            <Link href="/work" className="mt-5 inline-flex text-sm font-semibold text-[var(--color-accent)] hover:underline">
              Explore selected work <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="card">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">External profile</p>
            <h2 className="mt-3 text-xl font-semibold text-[var(--color-text-primary)]">Independent activity summary</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
              Exceeds publishes an external profile based on its own analysis of connected public engineering activity. View the source for the latest figures, repositories, and work history.
            </p>
            <a href={exceedsProfileUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:underline">
              View public Exceeds profile <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
          <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
            Source note: Exceeds is an independent third-party service. This portfolio does not copy, store, or reinterpret its profile data, and its figures may change as the service refreshes its analysis. The profile opens on exceeds.ai under its own terms and privacy notice.
          </p>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            name: `Engineering Profile | ${SITE_NAME}`,
            description: SITE_DESCRIPTION,
            url: `${SITE_URL}/engineering`,
            mainEntity: { '@type': 'Person', name: SITE_NAME },
            sameAs: [exceedsProfileUrl],
          }).replace(/</g, '\\u003c'),
        }}
      />
    </section>
  );
}
