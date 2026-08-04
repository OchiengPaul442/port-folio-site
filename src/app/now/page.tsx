import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/ScrollReveal';
import { JsonLd } from '@/components/seo/JsonLd';
import { nowBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'What Paul Ochieng Is Building Now',
  description:
    'What Paul Ochieng Levi is currently building, learning, and exploring. Active projects, current focus areas, and open problems in software engineering.',
  openGraph: {
    title: 'What Paul Ochieng Is Building Now',
    description: 'Current projects and focus areas of a full-stack software engineer in Kampala, Uganda.',
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
            Last updated: August 2026
          </p>
        </ScrollReveal>

        <div className="mt-10 space-y-10">
          <ScrollReveal delay={0.08}>
            <div>
              <h2 className="section-label">Active Projects</h2>
              <div className="mt-4 space-y-4">
                <div className="card">
                  <h3 className="font-semibold text-[var(--color-text-primary)]">NexCode</h3>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    Building a multi-agent AI coding assistant for VS Code with
                    sensible task routing, resilient provider connections, and a
                    less distracting editor experience.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="rounded-md bg-[var(--color-bg-tertiary)] px-2 py-0.5 font-mono text-xs text-[var(--color-text-tertiary)]">TypeScript</span>
                    <span className="rounded-md bg-[var(--color-bg-tertiary)] px-2 py-0.5 font-mono text-xs text-[var(--color-text-tertiary)]">VS Code API</span>
                    <span className="rounded-md bg-[var(--color-bg-tertiary)] px-2 py-0.5 font-mono text-xs text-[var(--color-text-tertiary)]">Multi-Agent</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div>
              <h2 className="section-label">Current Focus</h2>
              <ul className="mt-4 space-y-3 text-[var(--color-text-secondary)]">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  Full-stack product craft: creating clear interfaces and dependable services that work well together
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  Developer tooling: making everyday engineering workflows calmer, faster, and easier to understand
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  Environmental data infrastructure: contributing to AirQo&apos;s platform and its community-facing products
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <div>
              <h2 className="section-label">Open Problems I&apos;m Thinking About</h2>
              <ul className="mt-4 space-y-3 text-[var(--color-text-secondary)]">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-text-tertiary)]" />
                  How to make sophisticated product experiences fast and trustworthy on constrained devices and connections
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-text-tertiary)]" />
                  Better ways to design resilient systems when a dependency, provider, or network connection fails
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-text-tertiary)]" />
                  Making complex data genuinely useful for non-technical community members
                </li>
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
