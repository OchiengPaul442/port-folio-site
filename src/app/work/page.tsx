import type { Metadata } from 'next';
import { ProjectCard } from '@/components/ProjectCard';
import { getAllProjects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Projects and case studies by Paul Ochieng Levi — full-stack products, data platforms, and developer tools.',
};

export default function WorkPage() {
  const projects = getAllProjects();
  const contributions = [
    { name: 'AirQo Frontend', description: 'Contributed to the web experience for an air-quality platform serving African communities.', href: 'https://github.com/airqo-platform/AirQo-frontend' },
    { name: 'AirQo API', description: 'Contributed to the backend systems and APIs behind AirQo’s environmental-data products.', href: 'https://github.com/airqo-platform/AirQo-api' },
    { name: 'PICSA Apps', description: 'Contributed to open-source tools that help make climate information more useful to communities.', href: 'https://github.com/e-picsa/picsa-apps' },
  ];

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Work
        </h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          A selection of products I&apos;ve built or contributed to—spanning frontend
          experience, backend systems, data, and emerging technology.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              subtitle={project.subtitle}
              status={project.status}
              stack={project.stack}
            />
          ))}
        </div>
        <section className="mt-20 border-t border-[var(--color-border)] pt-12" aria-labelledby="open-source">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">Open source</p>
          <h2 id="open-source" className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">Contributing to public-interest technology.</h2>
          <p className="mt-3 max-w-2xl text-[var(--color-text-secondary)]">I also contribute to collaborative projects whose impact reaches beyond a single product team.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {contributions.map((project) => (
              <a key={project.href} href={project.href} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)]/80 p-5 transition-all hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]">
                <h3 className="font-semibold text-[var(--color-text-primary)]">{project.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{project.description}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-[var(--color-accent)] group-hover:translate-x-1 transition-transform">View on GitHub →</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
