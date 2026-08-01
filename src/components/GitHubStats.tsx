'use client';

import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, GitCommitHorizontal, LoaderCircle } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionResponse {
  year: number;
  total: number;
  contributions: ContributionDay[];
}

const MIN_YEAR = 2022;

function buildWeeks(year: number, days: ContributionDay[]) {
  const byDate = new Map(days.map((day) => [day.date, day]));
  const start = new Date(Date.UTC(year, 0, 1));
  const end = new Date(Date.UTC(year, 11, 31));
  const cells: (ContributionDay | null)[] = [];

  for (let i = 0; i < start.getUTCDay(); i++) cells.push(null);
  for (const cursor = new Date(start); cursor <= end; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
    const date = cursor.toISOString().slice(0, 10);
    cells.push(byDate.get(date) ?? { date, count: 0, level: 0 });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  return Array.from({ length: cells.length / 7 }, (_, index) => cells.slice(index * 7, index * 7 + 7));
}

export function GitHubStats() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - MIN_YEAR + 1 }, (_, index) => currentYear - index);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [data, setData] = useState<ContributionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/github/contributions?year=${selectedYear}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Contribution request failed');
        return response.json() as Promise<ContributionResponse>;
      })
      .then(setData)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setFailed(true);
        setData(null);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [selectedYear]);

  function selectYear(year: number) {
    setSelectedYear(year);
    setLoading(true);
    setFailed(false);
  }

  const weeks = useMemo(
    () => buildWeeks(selectedYear, data?.contributions ?? []),
    [selectedYear, data]
  );

  return (
    <div className="space-y-6">
      <ScrollReveal delay={0.05}>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 sm:p-7">
          <div className="flex flex-col gap-5 border-b border-[var(--color-border)] pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="section-label">Public GitHub activity</p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
                {loading ? 'Loading contributions…' : failed ? 'Contribution history unavailable' : `${data?.total.toLocaleString() ?? 0} contributions in ${selectedYear}`}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-text-secondary)]">
                A public record of commits, pull requests, issues, and reviews associated with my GitHub profile.
              </p>
            </div>
            <a href="https://github.com/OchiengPaul442" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:underline">
              View GitHub profile <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2" role="tablist" aria-label="Contribution year">
            {years.map((year) => (
              <button
                key={year}
                type="button"
                role="tab"
                aria-selected={selectedYear === year}
                onClick={() => selectYear(year)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${selectedYear === year ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]' : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'}`}
              >
                {year}
              </button>
            ))}
          </div>

          {loading && (
            <div className="mt-6 flex min-h-40 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[var(--color-text-tertiary)]">
              <LoaderCircle className="h-6 w-6 animate-spin text-[var(--color-accent)]" aria-label="Loading GitHub contributions" />
            </div>
          )}

          {!loading && !failed && (
            <div className="github-calendar-scroll mt-6" tabIndex={0} aria-label={`${selectedYear} GitHub contribution calendar`}>
              <div className="github-calendar-weeks">
                {weeks.map((week, weekIndex) => {
                  const firstDay = week.find(Boolean) as ContributionDay | undefined;
                  const month = firstDay ? new Date(`${firstDay.date}T00:00:00Z`).getUTCMonth() : -1;
                  const showMonth = weekIndex === 0 || (weekIndex > 0 && month !== new Date(`${weeks[weekIndex - 1].find(Boolean)?.date ?? firstDay?.date}T00:00:00Z`).getUTCMonth());
                  return (
                    <div key={weekIndex} className="github-calendar-week">
                      <span className="github-calendar-month">{showMonth && firstDay ? new Date(`${firstDay.date}T00:00:00Z`).toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }) : ''}</span>
                      {week.map((day, dayIndex) => (
                        <span key={day?.date ?? `${weekIndex}-${dayIndex}`} title={day ? `${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}` : undefined} aria-label={day ? `${day.count} contributions on ${day.date}` : undefined} className={`github-calendar-cell level-${day?.level ?? 0}`} />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {failed && <p className="mt-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-4 text-sm text-[var(--color-text-secondary)]">GitHub&apos;s public contribution service is temporarily unavailable. You can still view the live history on <a className="text-[var(--color-accent)] underline" href={`https://github.com/users/OchiengPaul442/contributions?from=${selectedYear}-01-01&to=${selectedYear}-12-31`} target="_blank" rel="noopener noreferrer">GitHub</a>.</p>}

          <div className="mt-4 flex items-center justify-between text-xs text-[var(--color-text-tertiary)]">
            <span className="inline-flex items-center gap-2"><GitCommitHorizontal className="h-4 w-4" aria-hidden="true" /> Public contribution calendar</span>
            <span>Less <i className="github-calendar-cell level-0" /> <i className="github-calendar-cell level-1" /> <i className="github-calendar-cell level-2" /> <i className="github-calendar-cell level-3" /> <i className="github-calendar-cell level-4" /> More</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
