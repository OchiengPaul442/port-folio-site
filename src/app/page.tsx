import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { getFeaturedProjects } from '@/lib/projects';
import { getGitHubProfile } from '@/lib/github';

const capabilities = [
  ['Product engineering', 'I take products from a clear problem to a dependable release: thoughtful interfaces, robust APIs, and the decisions between them.'],
  ['Frontend systems', 'Responsive React and Next.js experiences with accessible interaction patterns, practical performance budgets, and maintainable component architecture.'],
  ['Backend & data', 'APIs, databases, authentication, integrations, and data flows built with Python, Django, TypeScript, PostgreSQL, and cloud services.'],
  ['Applied AI', 'I explore AI where it earns its place—useful developer tooling, data assistance, and privacy-conscious workflows rather than novelty for its own sake.'],
];

export default async function Home() {
  const profilePromise = getGitHubProfile();
  const featuredProjects = getFeaturedProjects();
  const profile = await profilePromise;

  return (
    <>
      <section className="hero-surface px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="reveal-up text-sm font-medium text-[var(--color-text-secondary)]">Kampala, Uganda · Full-stack software engineer</p>
            <h1 className="reveal-up-delay mt-6 max-w-3xl text-5xl font-bold tracking-[-0.045em] text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl">I build dependable digital products.</h1>
            <p className="reveal-up-delay-2 mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">I&apos;m Paul Ochieng Levi, a full-stack software engineer in Kampala. I design and build the interfaces, systems, and integrations that help people get real work done.</p>
            <div className="reveal-up-delay-2 mt-8 flex flex-wrap gap-3">
              <Link href="/work" className="inline-flex items-center rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-text)] transition-transform hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]">Explore my work <span className="ml-2">→</span></Link>
              <Link href="/contact" className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-primary)]/70 px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]">Start a conversation</Link>
            </div>
          </div>
          <aside className="float-soft rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-primary)]/85 p-6 shadow-xl shadow-stone-900/5 backdrop-blur" aria-label="Engineering approach">
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">From the first sketch to a stable release.</p>
            <div className="mt-6 space-y-5">
              {[['Listen closely', 'Start with the people and constraints behind the request.'], ['Build deliberately', 'Connect interface, data, and infrastructure without losing the thread.'], ['Improve in the open', 'Use feedback and real use to make the next version better.']].map(([title, text]) => <div key={title}><p className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</p><p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">{text}</p></div>)}
            </div>
            <div className="mt-7 border-t border-[var(--color-border)] pt-5 font-mono text-xs text-[var(--color-text-tertiary)]">Frontend · Backend · Product thinking</div>
          </aside>
        </div>
      </section>

      <section className="px-6 py-20" aria-labelledby="selected-work"><div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">Selected work</p><h2 id="selected-work" className="mt-3 text-3xl font-bold tracking-tight">Things I&apos;ve made and improved.</h2></div><Link href="/work" className="text-sm font-semibold text-[var(--color-accent)] hover:underline">View every project →</Link></div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{featuredProjects.map((project) => <ProjectCard key={project.slug} {...project} />)}</div>
      </div></section>

      <section className="bg-[var(--color-bg-secondary)] px-6 py-20" aria-labelledby="capabilities"><div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">Capabilities</p><h2 id="capabilities" className="mt-3 max-w-xl text-3xl font-bold tracking-tight">A balanced product engineering practice.</h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">{capabilities.map(([title, description], index) => <div key={title} className="bg-[var(--color-bg-primary)] p-7 transition-colors hover:bg-amber-50 dark:hover:bg-stone-900"><span className="font-mono text-xs text-[var(--color-accent)]">0{index + 1}</span><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">{description}</p></div>)}</div>
      </div></section>

      <section className="px-6 py-20" aria-labelledby="github-activity"><div className="mx-auto flex max-w-5xl flex-col justify-between gap-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-8 sm:flex-row sm:items-end">
        <div><p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">Open source</p><h2 id="github-activity" className="mt-3 text-2xl font-bold">I share the work as I go.</h2><p className="mt-2 max-w-lg text-sm leading-6 text-[var(--color-text-secondary)]">Explore experiments, product work, and engineering notes on GitHub.</p></div>
        <div className="flex gap-8"><div><div className="text-3xl font-bold">{profile?.public_repos ?? '—'}+</div><div className="mt-1 text-xs text-[var(--color-text-tertiary)]">Public repos</div></div><a href="https://github.com/OchiengPaul442" target="_blank" rel="noopener noreferrer" className="self-end text-sm font-semibold text-[var(--color-accent)] hover:underline">Visit GitHub →</a></div>
      </div></section>
    </>
  );
}
