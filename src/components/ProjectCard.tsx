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
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/40 hover:shadow-xl hover:shadow-[var(--color-accent)]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      {/* Accent top bar — clipped by overflow-hidden */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-[var(--color-accent)] scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
            {title}
          </h3>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {subtitle}
          </p>
        </div>
        <span
          className={`shrink-0 flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            status === 'shipped'
              ? 'bg-[var(--color-success-bg)] text-[var(--color-success-text)]'
              : 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${status === 'shipped' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          {status}
        </span>
      </div>
      <div className="mt-auto pt-4">
        <div className="flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-[var(--color-bg-tertiary)] px-2 py-0.5 font-mono text-xs text-[var(--color-text-tertiary)]"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 text-sm font-semibold text-[var(--color-accent)] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          Read the case study →
        </div>
      </div>
    </Link>
  );
}
