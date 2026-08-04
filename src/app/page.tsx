import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { getFeaturedProjects } from '@/lib/projects';
import { ScrollReveal } from '@/components/ScrollReveal';
import { GitHubStats } from '@/components/GitHubStats';
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_PROFILES,
} from '@/lib/site';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Full-Stack Software Engineer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/twitter-image'],
  },
};

const capabilities = [
  ['Product engineering', 'From problem to production. I build interfaces people trust, APIs that scale, and the architecture decisions that hold it all together.'],
  ['Frontend systems', 'React and Next.js applications built for real users: accessible, fast on slow connections, and maintainable months after launch.'],
  ['Backend & data', 'Python, Django, TypeScript, and PostgreSQL. APIs, authentication, data pipelines, and the integrations that connect systems.'],
  ['Applied AI', 'AI where it earns its place. Coding assistants, data agents, and developer tools built for real workflows, not demos.'],
];

export default async function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        {/* Subtle dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--color-text-primary) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />
        <div className="hero-accent-line" aria-hidden="true" />

        <div className="relative px-6 pt-4 pb-24 sm:pt-12 sm:pb-32">
          <div className="mx-auto max-w-5xl">
            {/* Top meta line */}
            <div className="flex items-center gap-3 text-sm text-[var(--color-text-tertiary)] reveal-up">
              <span className="font-mono">Kampala, Uganda</span>
              <span className="font-mono">·</span>
              <span className="font-mono">Software Engineer</span>
            </div>

                {/* Main heading: asymmetric, weight contrast */}
            <div className="mt-10 reveal-up-delay">
              <h1 className="text-6xl tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-7xl lg:text-8xl">
                <span className="block font-light">Paul</span>
                <span className="-mt-2 block font-bold tracking-[-0.05em] text-[var(--color-accent)] sm:-mt-4">
                  Ochieng.
                </span>
              </h1>
              <p className="mt-4 text-base font-medium text-[var(--color-text-secondary)] sm:text-lg">
                Full-Stack Software Engineer in Kampala, Uganda
              </p>
            </div>

            {/* Statement + CTAs */}
            <div className="mt-10 max-w-2xl reveal-up-delay-2">
              <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                I engineer reliable digital products from AI-powered tools and
                data platforms to scalable web applications built to perform
                under real-world constraints.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-accent-text)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-accent)]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                >
                  See the work
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-medium text-[var(--color-text-tertiary)] transition-colors duration-200 hover:text-[var(--color-accent)]"
                >
                  Start a conversation →
                </Link>
              </div>
            </div>

                {/* Status strip: horizontal on desktop */}
            <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 reveal-up-delay-2">
              {[
                { label: 'Now', text: 'Building NexCode, a multi-agent AI coding assistant for VS Code' },
                { label: 'Thinking', text: 'Resilient systems that work when dependencies fail' },
                { label: 'Focus', text: 'Full-stack craft · developer tools · environmental data' },
              ].map((item) => (
                <div key={item.label} className="group flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 transition-colors duration-200 hover:border-[var(--color-accent)]/30">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-tertiary)]">{item.label}</p>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Selected Work ─── */}
      <section className="px-6 py-20" aria-labelledby="selected-work">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="section-label">Selected work</p>
                <h2 id="selected-work" className="mt-3 text-3xl font-bold tracking-tight">Things I&apos;ve made and improved.</h2>
              </div>
              <Link href="/work" className="text-sm font-semibold text-[var(--color-accent)] hover:underline">View every project →</Link>
            </div>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ScrollReveal key={project.slug} delay={index * 0.08}>
                <ProjectCard
                  slug={project.slug}
                  title={project.title}
                  subtitle={project.subtitle}
                  status={project.status}
                  stack={project.stack}
                  image={project.image}
                  category={project.category}
                  tags={project.tags}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider section-divider--accent" aria-hidden="true" />

      {/* ─── Capabilities ─── */}
      <section className="px-6 py-20" aria-labelledby="capabilities">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <p className="section-label">Capabilities</p>
            <h2 id="capabilities" className="mt-3 max-w-xl text-3xl font-bold tracking-tight">A balanced product engineering practice.</h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {capabilities.map(([title, description], index) => (
              <ScrollReveal key={title} delay={index * 0.08}>
                <div className="card group relative h-full">
                  <span className="font-mono text-xs font-semibold text-[var(--color-accent)]">0{index + 1}</span>
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">{description}</p>
                  <div className="absolute bottom-0 left-6 right-6 h-px bg-[var(--color-accent)] scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* ─── Open Source ─── */}
      <section className="px-6 py-20" aria-labelledby="github-activity">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <p className="section-label">Open source</p>
                <h2 id="github-activity" className="mt-3 text-3xl font-bold tracking-tight">I share the work as I go.</h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-[var(--color-text-secondary)]">Browse source code, documentation, and experiments behind these projects.</p>
              </div>
              <a href="https://github.com/OchiengPaul442" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
                GitHub
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </a>
            </div>
          </ScrollReveal>
          <GitHubStats />
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Person',
                '@id': `${SITE_URL}/#person`,
                name: 'Paul Ochieng Levi',
                alternateName: ['Paul Ochieng', 'Ochieng Paul'],
                url: SITE_URL,
                jobTitle: 'Full-Stack Software Engineer',
                worksFor: {
                  '@type': 'Organization',
                  name: 'AirQo',
                },
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Kampala',
                  addressCountry: 'UG',
                },
                image: `${SITE_URL}/brand/logo-transparent-512.png`,
                sameAs: SOCIAL_PROFILES,
                knowsAbout: [
                  'Full-stack software engineering',
                  'Next.js',
                  'React',
                  'TypeScript',
                  'Python',
                  'FastAPI',
                  'Django',
                  'Applied AI',
                  'Developer tools',
                  'Environmental technology',
                  'Air quality data systems',
                ],
              },
              {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                name: 'Paul Ochieng Levi',
                alternateName: 'ochiengpaul.com',
                url: SITE_URL,
                inLanguage: 'en-UG',
                description: SITE_DESCRIPTION,
                publisher: {
                  '@id': `${SITE_URL}/#person`,
                },
              },
              {
                '@type': 'ProfilePage',
                '@id': `${SITE_URL}/#profilepage`,
                url: SITE_URL,
                name: SITE_TITLE,
                description: SITE_DESCRIPTION,
                inLanguage: 'en-UG',
                isPartOf: {
                  '@id': `${SITE_URL}/#website`,
                },
                mainEntity: {
                  '@id': `${SITE_URL}/#person`,
                },
              },
            ],
          }).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
}
