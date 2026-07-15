interface TimelineItem {
  period: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-0 bottom-0 w-px bg-[var(--color-border)]" aria-hidden="true" />
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative pl-10">
            <div
              className="absolute left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg-primary)]"
              aria-hidden="true"
            />
            <div>
              <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                {item.period}
              </span>
              <h3 className="mt-1 text-base font-semibold text-[var(--color-text-primary)]">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
