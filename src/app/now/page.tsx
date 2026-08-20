import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ScrollReveal';
import { JsonLd } from '@/components/seo/JsonLd';
import { nowBreadcrumbs } from '@/lib/seo';
import { nowContent } from '@/lib/now';

export const metadata: Metadata = {
  title: 'What Paul Ochieng Is Building Now',
  description:
    'Currently building ATLAS, an e-mobility intelligence platform for Uganda\'s STI Mobility Bureau, plus the STI One Stop Center and NexCode. Active projects, current focus areas, and open problems in software engineering.',
  openGraph: {
    title: 'What Paul Ochieng Is Building Now',
    description: 'Currently building ATLAS, STI One Stop Center, and NexCode. Active projects, focus areas, and open problems.',
    url: '/now',
  },
  alternates: {
    canonical: '/now',
  },
};

export default function NowPage() {
  return (
    <>
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Now
          </h1>
          <p className="mt-2 font-mono text-sm text-[var(--color-text-tertiary)]">
            Last updated: {nowContent.lastUpdated}
          </p>
        </ScrollReveal>

        <div className="mt-10 space-y-10">
          <ScrollReveal delay={0.08}>
            <div>
              <h2 className="section-label">Active Projects</h2>
              <div className="mt-4 space-y-4">
                {nowContent.activeProjects.map((project) => (
                  <div key={project.title} className="card">
                    <h3 className="font-semibold text-[var(--color-text-primary)]">{project.title}</h3>
                    {project.subtitle && (
                      <p className="mt-1 text-xs text-[var(--color-text-tertiary)] italic">{project.subtitle}</p>
                    )}
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span key={tag} className="rounded-md bg-[var(--color-bg-tertiary)] px-2 py-0.5 font-mono text-xs text-[var(--color-text-tertiary)]">{tag}</span>
                        ))}
                      </div>
                      {project.link && (
                        <Link href={project.link.href} className="text-xs font-medium text-[var(--color-accent)] underline hover:text-[var(--color-text-primary)] transition-colors">
                          {project.link.label}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div>
              <h2 className="section-label">Current Focus</h2>
              <ul className="mt-4 space-y-3 text-[var(--color-text-secondary)]">
                {nowContent.currentFocus.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <div>
              <h2 className="section-label">Open Problems I&apos;m Thinking About</h2>
              <ul className="mt-4 space-y-3 text-[var(--color-text-secondary)]">
                {nowContent.openProblems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-text-tertiary)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
    <JsonLd data={nowBreadcrumbs()} />
    </>
  );
}
