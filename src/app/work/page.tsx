import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { JsonLd } from '@/components/seo/JsonLd';
import { FLAGSHIP_PROJECT_SLUGS, getAllProjects, getFlagshipProjects } from '@/lib/projects';
import { SITE_URL } from '@/lib/site';
import { workBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Software Projects and Case Studies | Paul Ochieng',
  description:
    'Selected software projects and case studies by Paul Ochieng Levi, including AirQo, AirQo Nexus, AirQo open-source packages, PICSA Apps, Mizani, Dawa, OnCallUg, AQMRG, STI, Builld, and Coinz.',
  openGraph: {
    locale: 'en_UG',
    title: 'Software Projects and Case Studies | Paul Ochieng',
    description:
      'Selected full-stack products, public-interest platforms, open-source contributions, and data systems built by Paul Ochieng Levi.',
    url: '/work',
  },
  alternates: {
    canonical: '/work',
  },
};

export default function WorkPage() {
  const flagshipProjects = getFlagshipProjects();
  const flagshipSlugs = new Set<string>(FLAGSHIP_PROJECT_SLUGS);
  const additionalProjects = getAllProjects().filter((project) => !flagshipSlugs.has(project.slug));

  return (
    <>
      <section className="px-6 pb-20 pt-16">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="max-w-3xl">
              <p className="section-label">Selected work</p>
              <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-[var(--color-text-primary)] sm:text-5xl">
                Production-minded software for real-world needs.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg">
                A curated view of products, platforms, and open-source contributions across public-interest technology, environmental data, marketplaces, and digital products.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
              <a
                href="#flagship-work"
                className="rounded-lg bg-[var(--color-accent)] px-5 py-3 font-semibold text-[var(--color-accent-text)] transition-shadow hover:shadow-lg hover:shadow-[var(--color-accent)]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                Explore flagship work
              </a>
              <Link
                href="/contact"
                className="font-semibold text-[var(--color-accent)] hover:underline"
              >
                Start a conversation <span aria-hidden="true">→</span>
              </Link>
            </div>
          </ScrollReveal>

          <section className="mt-20" aria-labelledby="flagship-work-heading" id="flagship-work">
            <ScrollReveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="section-label">Flagship work</p>
                  <h2 id="flagship-work-heading" className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
                    The work I want people to see first.
                  </h2>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-text-tertiary)]">
                  {flagshipProjects.length} projects
                </p>
              </div>
            </ScrollReveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {flagshipProjects.map((project, index) => (
                <ScrollReveal key={project.slug} delay={index * 0.04}>
                  <ProjectCard
                    slug={project.slug}
                    title={project.title}
                    subtitle={project.subtitle}
                    client={project.client}
                    status={project.status}
                    stack={project.stack}
                    image={project.image}
                    category={project.category}
                    tags={project.tags}
                  />
                </ScrollReveal>
              ))}
            </div>
          </section>

          <section className="mt-24 border-t border-[var(--color-border)] pt-12" aria-labelledby="additional-work">
            <ScrollReveal>
              <p className="section-label">Additional projects & contributions</p>
              <h2 id="additional-work" className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
                More experiments, systems, and open-source work.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
                The full archive stays available for context. Paused work is labelled clearly, while shipped projects show the range of systems I have helped bring to life.
              </p>
            </ScrollReveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {additionalProjects.map((project, index) => (
                <ScrollReveal key={project.slug} delay={index * 0.04}>
                  <ProjectCard
                    slug={project.slug}
                    title={project.title}
                    subtitle={project.subtitle}
                    client={project.client}
                    status={project.status}
                    stack={project.stack}
                    image={project.image}
                    category={project.category}
                    tags={project.tags}
                  />
                </ScrollReveal>
              ))}
            </div>
          </section>

          <section className="mt-24 border-t border-[var(--color-border)] pt-12" aria-labelledby="open-source">
            <ScrollReveal>
              <p className="section-label">Open source</p>
              <h2 id="open-source" className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
                Contributing to public-interest technology.
              </h2>
              <p className="mt-3 max-w-2xl text-[var(--color-text-secondary)]">
                I also contribute to collaborative projects whose impact reaches beyond a single product team, including AirQo and PICSA Apps.
              </p>
            </ScrollReveal>
            <div className="mt-7 grid gap-6 sm:grid-cols-3">
              {[
                { name: 'AirQo frontend', description: 'Multilingual web experiences for air-quality information across African communities.', href: 'https://github.com/airqo-platform/AirQo-frontend' },
                { name: 'AirQo API', description: 'Content and data services behind AirQo\'s public-facing products.', href: 'https://github.com/airqo-platform/AirQo-api' },
                { name: 'PICSA Apps', description: 'Open-source tools supporting climate services and agricultural extension.', href: 'https://github.com/e-picsa/picsa-apps' },
              ].map((project, index) => (
                <ScrollReveal key={project.href} delay={index * 0.08}>
                  <a href={project.href} target="_blank" rel="noopener noreferrer" className="card group flex h-full flex-col">
                    <h3 className="font-semibold text-[var(--color-text-primary)]">{project.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{project.description}</p>
                    <span className="mt-5 text-sm font-semibold text-[var(--color-accent)] transition-transform duration-200 group-hover:translate-x-1">View on GitHub <span aria-hidden="true">→</span></span>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </div>
      </section>

      <JsonLd data={workBreadcrumbs()} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${SITE_URL}/work#collection`,
          name: 'Software Projects and Case Studies by Paul Ochieng Levi',
          url: `${SITE_URL}/work`,
          isPartOf: { '@id': `${SITE_URL}/#website` },
          mainEntity: {
            '@type': 'ItemList',
            itemListOrder: 'https://schema.org/ItemListOrderAscending',
            numberOfItems: flagshipProjects.length,
            itemListElement: flagshipProjects.map((project, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: project.title,
              url: `${SITE_URL}/work/${project.slug}`,
            })),
          },
        }}
      />
    </>
  );
}
