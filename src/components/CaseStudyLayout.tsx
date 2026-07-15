import Link from 'next/link';

interface CaseStudyLayoutProps {
  title: string;
  subtitle: string;
  status: string;
  stack: string[];
  repo?: string | null;
  liveUrl?: string | null;
  children: React.ReactNode;
}

export function CaseStudyLayout({
  title,
  subtitle,
  status,
  stack,
  repo,
  liveUrl,
  children,
}: CaseStudyLayoutProps) {
  return (
    <article className="prose max-w-none">
      <header className="not-prose mb-12">
        <Link
          href="/work"
          className="mb-8 inline-flex items-center gap-1 text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          &larr; All Work
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-lg text-[var(--color-text-secondary)]">
          {subtitle}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              status === 'shipped'
                ? 'bg-[var(--color-success-bg)] text-[var(--color-success-text)]'
                : 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]'
            }`}
          >
            {status}
          </span>
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              View source ↗
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              Visit live site ↗
            </a>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded bg-[var(--color-bg-tertiary)] px-2 py-0.5 font-mono text-xs text-[var(--color-text-tertiary)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </header>
      {children}
    </article>
  );
}
