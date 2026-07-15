import Link from 'next/link';

interface ProjectCardProps {
  slug: string;
  title: string;
  subtitle: string;
  status: string;
  stack: string[];
}

export function ProjectCard({ slug, title, subtitle, status, stack }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${slug}`}
      className="group block rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 transition-all hover:border-[var(--color-accent)] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
            {title}
          </h3>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {subtitle}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            status === 'shipped'
              ? 'bg-[var(--color-success-bg)] text-[var(--color-success-text)]'
              : 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]'
          }`}
        >
          {status}
        </span>
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
      <div className="mt-4 text-sm font-medium text-[var(--color-accent)] opacity-0 transition-opacity group-hover:opacity-100">
        View case study &rarr;
      </div>
    </Link>
  );
}
