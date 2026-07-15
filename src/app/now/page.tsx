import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Now',
  description:
    'What Paul Ochieng Levi is currently working on — active projects, open problems, and current focus areas.',
};

export default function NowPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Now
        </h1>
        <p className="mt-2 font-mono text-sm text-[var(--color-text-tertiary)]">
          Last updated: July 2026
        </p>

        <div className="mt-10 space-y-10">
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              Active Projects
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
                <h3 className="font-semibold text-[var(--color-text-primary)]">Pulse</h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  Local AI coding agent for VS Code. Currently chasing a v0.0.92
                  regression where the extension silently fails to activate under
                  certain workspace conditions. Root-caused the issue to
                  activation event mismatches and a session-restore race condition.
                  Working on the fix.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded bg-[var(--color-bg-tertiary)] px-2 py-0.5 font-mono text-xs text-[var(--color-text-tertiary)]">
                    TypeScript
                  </span>
                  <span className="rounded bg-[var(--color-bg-tertiary)] px-2 py-0.5 font-mono text-xs text-[var(--color-text-tertiary)]">
                    VS Code API
                  </span>
                  <span className="rounded bg-[var(--color-bg-tertiary)] px-2 py-0.5 font-mono text-xs text-[var(--color-text-tertiary)]">
                    Ollama
                  </span>
                </div>
              </div>
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
                <h3 className="font-semibold text-[var(--color-text-primary)]">NexCode</h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  Multi-agent AI coding assistant. Refining the auto-routing logic
                  between fast and deep models. Adding more comprehensive error
                  recovery for provider connection failures.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded bg-[var(--color-bg-tertiary)] px-2 py-0.5 font-mono text-xs text-[var(--color-text-tertiary)]">
                    TypeScript
                  </span>
                  <span className="rounded bg-[var(--color-bg-tertiary)] px-2 py-0.5 font-mono text-xs text-[var(--color-text-tertiary)]">
                    Multi-Agent
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              Current Focus
            </h2>
            <ul className="mt-4 space-y-2 text-[var(--color-text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                Local-first AI tooling — building coding agents that respect privacy and work offline
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                VS Code extension development — performance profiling, model routing, workspace awareness
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                Environmental data infrastructure — contributing to AirQo&apos;s platform
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              Open Problems I&apos;m Thinking About
            </h2>
            <ul className="mt-4 space-y-2 text-[var(--color-text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-text-tertiary)]" />
                How to make AI coding agents useful on 8GB RAM machines without cloud fallback
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-text-tertiary)]" />
                Better error recovery patterns for multi-agent systems when individual agents fail
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-text-tertiary)]" />
                Making air quality data actionable for non-technical community members
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
