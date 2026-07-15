import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { getFeaturedProjects } from '@/lib/projects';
import { getGitHubProfile } from '@/lib/github';

export default async function Home() {
  const featuredProjects = getFeaturedProjects();
  const profile = await getGitHubProfile();

  return (
    <>
      {/* Hero */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-sm text-[var(--color-text-tertiary)]">
            Software Engineer &middot; Kampala, Uganda
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
            Paul Ochieng Levi
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-text-secondary)]">
            Building AI-powered tools, environmental-data platforms, and product
            infrastructure &mdash; with a focus on problems particular to African
            markets: low-bandwidth performance, multi-language support, and
            infrastructure that works where Western assumptions don&apos;t hold.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/work"
              className="inline-flex items-center rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-accent-text)] hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              View Work
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              Resume
            </Link>
          </div>
          <div className="mt-8 flex gap-4">
            <a
              href="https://github.com/OchiengPaul442"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:paul@example.com"
              className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="px-6 py-16 bg-[var(--color-bg-secondary)]" aria-labelledby="selected-work">
        <div className="mx-auto max-w-4xl">
          <h2 id="selected-work" className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
            Selected Work
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
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
          <div className="mt-8">
            <Link
              href="/work"
              className="text-sm font-medium text-[var(--color-accent)] hover:underline underline-offset-2"
            >
              View all projects &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-6 py-16" aria-labelledby="capabilities">
        <div className="mx-auto max-w-4xl">
          <h2 id="capabilities" className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
            Capabilities
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                AI-Enabled Products
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                Building AI agents and tools that run locally, with multi-model
                routing, workspace awareness, and privacy-first architecture.
                VS Code extensions, LangGraph orchestrations, Ollama integrations.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                Environmental Data Platforms
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                Building the infrastructure that makes air quality data accessible
                across African communities. REST APIs, data pipelines, real-time
                monitoring dashboards, and 40+ language support.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                Full-Stack Product Engineering
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                End-to-end product development with TypeScript, Python, React,
                Next.js, Django, and PostgreSQL. From prototype to production
                deployment on Vercel and cloud platforms.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                Developer Tooling
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                Building tools that improve developer experience — VS Code
                extensions, PDF editors, API backends with comprehensive
                documentation and performance optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Activity */}
      <section className="px-6 py-16 bg-[var(--color-bg-secondary)]" aria-labelledby="github-activity">
        <div className="mx-auto max-w-4xl">
          <h2 id="github-activity" className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
            GitHub Activity
          </h2>
          <div className="mt-8 flex flex-wrap gap-8">
            <div>
              <div className="text-3xl font-bold text-[var(--color-text-primary)]">
                {profile?.public_repos ?? 50}+
              </div>
              <div className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Public Repositories
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--color-text-primary)]">
                2,500+
              </div>
              <div className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Public Contributions
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--color-text-primary)]">
                {profile?.followers ?? 24}
              </div>
              <div className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Followers
              </div>
            </div>
          </div>
          <div className="mt-6">
            <a
              href="https://github.com/OchiengPaul442"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--color-accent)] hover:underline underline-offset-2"
            >
              View GitHub Profile &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 py-16" id="contact" aria-labelledby="contact-heading">
        <div className="mx-auto max-w-4xl">
          <h2 id="contact-heading" className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
            Get in Touch
          </h2>
          <p className="mt-4 max-w-xl text-[var(--color-text-secondary)]">
            Open to full-time roles, remote engineering positions, climate-tech
            collaboration, and consulting. Reach out via{' '}
            <a href="mailto:paul@example.com" className="text-[var(--color-accent)] underline underline-offset-2">
              email
            </a>{' '}
            or connect on{' '}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline underline-offset-2">
              LinkedIn
            </a>.
          </p>
        </div>
      </section>
    </>
  );
}
