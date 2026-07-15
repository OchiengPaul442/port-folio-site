import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Now',
  description:
    'What Paul Ochieng Levi is currently building, learning, and exploring.',
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
                  Refining a local-first VS Code assistant with a focus on a clear,
                  reliable developer workflow and useful performance on ordinary
                  machines.
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
                  A developer-tool experiment focused on sensible task routing,
                  resilient provider connections, and a less distracting editor
                  experience.
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
                Full-stack product craft — creating clear interfaces and dependable services that work well together
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                Developer tooling — making everyday engineering workflows calmer, faster, and easier to understand
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                Environmental data infrastructure — contributing to AirQo&apos;s platform and its community-facing products
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
                How to make sophisticated product experiences fast and trustworthy on constrained devices and connections
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-text-tertiary)]" />
                Better ways to design resilient systems when a dependency, provider, or network connection fails
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-text-tertiary)]" />
                Making complex data genuinely useful for non-technical community members
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
