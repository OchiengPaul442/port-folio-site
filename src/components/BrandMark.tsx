interface BrandMarkProps {
  className?: string;
  title?: string;
}

export function BrandMark({ className = 'h-9 w-9', title = 'Paul Ochieng Levi mark' }: BrandMarkProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="18" fill="currentColor" />
      <path d="M19 46V18h13.5c7.1 0 11.5 3.8 11.5 10.1 0 6.5-4.4 10.4-11.5 10.4H26" fill="none" stroke="var(--mark-ink, #0c0a09)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" />
      <path d="m36.5 41 6.5 5 6-8" fill="none" stroke="var(--mark-accent, #fff7ed)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
    </svg>
  );
}
