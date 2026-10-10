import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  slug: string;
  title: string;
  subtitle: string;
  client?: string;
  status: string;
  stack: string[];
  image?: string | null;
  category?: string;
  tags?: string[];
}

function statusLabel(status: string) {
  if (status === 'shipped') return 'Shipped';
  if (status === 'paused') return 'Paused';
  return status.replace(/-/g, ' ');
}

export function ProjectCard({
  slug,
  title,
  subtitle,
  client,
  status,
  stack,
  image,
  category,
  tags,
}: ProjectCardProps) {
  return (
    <Link
      href={`/work/${slug}`}
      aria-label={`Read the ${title} case study`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/50 hover:shadow-xl hover:shadow-[var(--color-accent)]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-tertiary)]">
        {image ? (
          <Image
            src={image}
            alt={`${title} project preview`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) 50vw, 320px"
          />
        ) : (
          <div className="flex h-full flex-col justify-between p-5 text-[var(--color-text-primary)]">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Open-source contribution
            </span>
            <span className="max-w-[12rem] text-2xl font-semibold tracking-tight">
              {title}
            </span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-stone-950/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          {statusLabel(status)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div>
          <div className="min-w-0">
            {category && (
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                {category}
              </p>
            )}
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-[var(--color-text-primary)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              {subtitle}
            </p>
            {client && (
              <p className="mt-3 text-xs font-medium text-[var(--color-text-tertiary)]">
                {client}
              </p>
            )}
          </div>
        </div>

        <div className="mt-auto pt-6">
          {tags && tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[10px] text-[var(--color-text-tertiary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between gap-4 border-t border-[var(--color-border)] pt-4">
            <div className="flex flex-wrap gap-1.5" aria-label="Technology stack">
              {stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-[var(--color-bg-tertiary)] px-2 py-1 font-mono text-[10px] text-[var(--color-text-tertiary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
            <span className="shrink-0 text-sm font-semibold text-[var(--color-accent)] transition-transform duration-300 group-hover:translate-x-1">
              Read case study <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
