'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ProjectCardProps {
  slug: string;
  title: string;
  subtitle: string;
  client?: string;
  status: string;
  stack: string[];
  image?: string;
  category?: string;
  tags?: string[];
}

const blurPlaceholder = 'data:image/webp;base64,UklGRigAAABXRUJQVlA4IBwAAACQAQCdASoBAAEAAkA4JYgCdAEO/hepgAAA/v3Mn/gP3MpSh6J/OaE7L/63rD0X+7Z3f+b7f/67rL0X+7Z3f+b7f/67';

export function ProjectCard({ slug, title, subtitle, client, status, stack, image, category, tags }: ProjectCardProps) {
  const [previewStarted, setPreviewStarted] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const intentTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (intentTimer.current) clearTimeout(intentTimer.current);
  }, []);

  function showPreview() {
    setPreviewVisible(true);
    if (previewStarted || !image) return;
    intentTimer.current = setTimeout(() => setPreviewStarted(true), 140);
  }

  function hidePreview() {
    if (intentTimer.current) clearTimeout(intentTimer.current);
    setPreviewVisible(false);
  }

  return (
    <Link
      href={`/work/${slug}`}
      onMouseEnter={showPreview}
      onMouseLeave={hidePreview}
      onFocus={showPreview}
      onBlur={hidePreview}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/40 hover:shadow-md hover:shadow-[var(--color-accent)]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      {/* Accent top bar */}
      <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-[var(--color-accent)] scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />

      {image && (previewVisible || previewStarted) && (
        <div className={`project-preview-tooltip pointer-events-none absolute left-4 right-4 top-4 z-20 overflow-hidden rounded-xl border border-[var(--color-accent)]/40 bg-[var(--color-bg-primary)] shadow-lg shadow-black/30 ${!previewVisible ? 'opacity-0 invisible' : ''}`} aria-hidden="true">
          <div className="relative h-40 w-full overflow-hidden bg-stone-950">
            {!imageLoaded && !imageFailed && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[var(--color-text-tertiary)]">
                <LoaderCircle className="h-6 w-6 animate-spin text-[var(--color-accent)]" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Loading preview</span>
                <span className="preview-signal" aria-hidden="true"><i /><i /><i /><i /></span>
              </div>
            )}
            {imageFailed && <div className="absolute inset-0 flex items-center justify-center px-6 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">Preview unavailable</div>}
            {previewStarted && (
              <Image
                src={image}
                alt=""
                fill
                placeholder="blur"
                blurDataURL={blurPlaceholder}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageFailed(true)}
                className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                sizes="(max-width: 640px) calc(100vw - 3rem), 288px"
              />
            )}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-7 text-[10px] font-medium text-white">
              <span>{title}</span><span className="text-amber-300">Preview</span>
            </div>
          </div>
        </div>
      )}

      {/* Card content: always visible, consistent sizing */}
      <div className="relative z-10 flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
              {title}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)] transition-colors duration-300 group-hover:text-[var(--color-text-primary)]">
              {subtitle}
            </p>
            {client && (
              <p className="mt-1.5 text-xs font-medium text-[var(--color-text-tertiary)]">
                Client: {client}
              </p>
            )}
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
                className="rounded-md bg-[var(--color-bg-tertiary)]/80 px-2 py-0.5 font-mono text-xs text-[var(--color-text-tertiary)] transition-colors duration-300 group-hover:bg-[var(--color-bg-secondary)]/80 group-hover:text-[var(--color-accent)]"
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
