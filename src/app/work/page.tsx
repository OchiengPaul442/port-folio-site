import type { Metadata } from 'next';
import { ProjectCard } from '@/components/ProjectCard';
import { getAllProjects } from '@/lib/projects';
import { ScrollReveal } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Projects and case studies by Paul Ochieng Levi — full-stack products, developer tools, AI agents, and open-source contributions. Built with React, Next.js, Python, and Django.',
  openGraph: {
    title: 'Work | Paul Ochieng Levi',
    description: 'Full-stack projects including AI agents, SaaS platforms, and developer tools.',
    url: 'https://www.ochiengpaul.com/work',
  },
  alternates: {
    canonical: 'https://www.ochiengpaul.com/work',
  },
};

export default function WorkPage() {
  const projects = getAllProjects();
  const contributions = [
    { name: 'AirQo Frontend', description: 'Contributed to the web experience for an air-quality platform serving African communities.', href: 'https://github.com/airqo-platform/AirQo-frontend' },
    { name: 'AirQo API', description: 'Contributed to the backend systems and APIs behind AirQo\'s environmental-data products.', href: 'https://github.com/airqo-platform/AirQo-api' },
    { name: 'PICSA Apps', description: 'Contributed to open-source tools that help make climate information more useful to communities.', href: 'https://github.com/e-picsa/picsa-apps' },
  ];

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Work
          </h1>
          <p className="mt-2 text-base text-[var(--color-text-secondary)]">
            A selection of products I&apos;ve built, shipped, or contributed to — spanning
            product interfaces, backend systems, environmental data, and developer tools.
          </p>
        </ScrollReveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.05}>
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
        <section className="mt-20 border-t border-[var(--color-border)] pt-12" aria-labelledby="open-source">
          <ScrollReveal>
            <p className="section-label">Open source</p>
            <h2 id="open-source" className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">Contributing to public-interest technology.</h2>
            <p className="mt-3 max-w-2xl text-[var(--color-text-secondary)]">I also contribute to collaborative projects whose impact reaches beyond a single product team.</p>
          </ScrollReveal>
          <div className="mt-7 grid gap-6 sm:grid-cols-3">
            {contributions.map((project, index) => (
              <ScrollReveal key={project.href} delay={index * 0.08}>
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="card group flex h-full flex-col">
                  <h3 className="font-semibold text-[var(--color-text-primary)]">{project.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{project.description}</p>
                  <span className="mt-5 inline-block text-sm font-semibold text-[var(--color-accent)] group-hover:translate-x-1 transition-transform duration-200">View on GitHub →</span>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
