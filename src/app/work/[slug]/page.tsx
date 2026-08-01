import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudyLayout } from '@/components/CaseStudyLayout';
import { ProjectVisual } from '@/components/ProjectVisual';
import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import { ScrollReveal } from '@/components/ScrollReveal';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      images: project.image
        ? [{ url: project.image, width: 1200, height: 750, alt: `${project.title} screenshot` }]
        : [],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <CaseStudyLayout
          title={project.title}
          subtitle={project.subtitle}
          status={project.status}
          stack={project.stack}
          repo={project.repo}
          liveUrl={project.liveUrl}
        >
          <div className="space-y-10">
            <ScrollReveal>
              <div className="not-prose">
                <ProjectVisual title={project.title} stack={project.stack} status={project.status} image={project.image} priority />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <section>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">What it is</h2>
                <p className="mt-2 text-[var(--color-text-secondary)]">{project.description}</p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <section>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">The Problem</h2>
                <p className="mt-2 text-[var(--color-text-secondary)]">{project.problem}</p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.11}>
              <section>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">My Role</h2>
                <p className="mt-2 text-[var(--color-text-secondary)]">{project.role}</p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.14}>
              <section>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Approach</h2>
                <p className="mt-2 text-[var(--color-text-secondary)]">{project.approach}</p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.17}>
              <section>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  Hardest Decision
                </h2>
                <p className="mt-2 text-[var(--color-text-secondary)]">{project.hardestDecision}</p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <section>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Status</h2>
                <p className="mt-2 text-[var(--color-text-secondary)]">{project.outcome}</p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.23}>
              <section>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  What I&apos;d Change
                </h2>
                <p className="mt-2 text-[var(--color-text-secondary)]">{project.whatIdChange}</p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.26}>
              <section>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Stack</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-[var(--color-bg-tertiary)] px-3 py-1 font-mono text-sm text-[var(--color-text-tertiary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          </div>
        </CaseStudyLayout>
      </div>
    </section>
  );
}
