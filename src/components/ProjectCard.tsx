import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  slug: string;
  title: string;
  subtitle: string;
  status: string;
  stack: string[];
  image?: string;
  category?: string;
  tags?: string[];
}

const blurPlaceholder = 'data:image/webp;base64,UklGRigAAABXRUJQVlA4IBwAAACQAQCdASoBAAEAAkA4JYgCdAEO/hepgAAA/v3Mn/gP3MpSh6J/OaE7L/63rD0X+7Z3f+b7f/67rL0X+7Z3f+b7f/67';

export function ProjectCard({ slug, title, subtitle, status, stack, image, category, tags }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/40 hover:shadow-xl hover:shadow-[var(--color-accent)]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      {/* Accent top bar */}
      <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-[var(--color-accent)] scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />

      {/* Image overlay — diagonal reveal from top-right on hover */}
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={`${title} screenshot`}
            fill
            placeholder="blur"
            blurDataURL={blurPlaceholder}
            className="object-cover transition-[clip-path] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] [clip-path:circle(0%_at_100%_0%)] group-hover:[clip-path:circle(150%_at_100%_0%)]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Multi-layer gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-secondary)] via-[var(--color-bg-secondary)]/90 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-secondary)]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {/* Subtle dark overlay for contrast */}
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      )}

      {/* Card content — always visible, consistent sizing */}
      <div className="relative z-10 flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
              {title}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)] transition-colors duration-300 group-hover:text-[var(--color-text-primary)]">
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
        {category && <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-accent)]">{category}</p>}
        <div className="mt-auto pt-4">
          {tags && <div className="mb-3 flex flex-wrap gap-1.5">{tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[10px] text-[var(--color-text-tertiary)]">{tag}</span>)}</div>}
          <div className="flex flex-wrap gap-1.5">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-[var(--color-bg-tertiary)]/80 backdrop-blur-sm px-2 py-0.5 font-mono text-xs text-[var(--color-text-tertiary)] transition-colors duration-300 group-hover:bg-[var(--color-bg-secondary)]/80 group-hover:text-[var(--color-accent)]"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-4 text-sm font-semibold text-[var(--color-accent)] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            Read the case study →
          </div>
        </div>
      </div>
    </Link>
  );
}
