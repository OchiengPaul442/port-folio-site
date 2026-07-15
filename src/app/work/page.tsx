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
      </div>
    </section>
  );
}
