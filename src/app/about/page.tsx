import type { Metadata } from 'next';
import { Timeline } from '@/components/Timeline';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Paul Ochieng Levi — software engineer in Kampala, Uganda building AI tools and environmental data platforms.',
};

const experience = [
  {
    period: 'Current Focus',
    title: 'AI Agent Development',
    description:
      'Building local-first AI coding agents (Pulse, NexCode) with multi-model routing, workspace awareness, and privacy-first architecture using VS Code extensions, Ollama, and LangGraph.',
  },
  {
    period: 'Active Contributor',
    title: 'AirQo Platform',
    description:
      'Contributing to AirQo\'s frontend and backend — internationalization supporting 40+ languages including African languages, REST API development, and dashboard components for air quality monitoring across Africa.',
  },
  {
    period: 'Ongoing',
    title: 'Full-Stack Product Development',
    description:
      'Building web applications with TypeScript, React, Next.js, and Django. Projects include PDF editors, API backends, and data visualization tools.',
  },
];

export default function AboutPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          About
        </h1>

        <div className="mt-10 space-y-10">
          <div className="prose max-w-none">
            <p className="text-lg text-[var(--color-text-secondary)]">
              I&apos;m Paul Ochieng Levi, a software engineer based in Kampala, Uganda.
              I build AI-powered tools, environmental-data platforms, and product
              infrastructure — with a specific focus on problems particular to
              African markets.
            </p>
            <p className="text-[var(--color-text-secondary)]">
              My work sits at the intersection of AI agents and environmental
              technology. I&apos;ve contributed to AirQo&apos;s platform serving air
              quality data across African communities, and I build local-first AI
              coding tools that work offline and respect developer privacy.
            </p>
            <p className="text-[var(--color-text-secondary)]">
              I care about low-bandwidth performance, multi-language support, and
              infrastructure that works where connectivity and hardware assumptions
              from the West don&apos;t hold. The best technology for African markets
              isn&apos;t simplified versions of Western products — it&apos;s
              purpose-built solutions that start from local constraints.
            </p>
          </div>

          <div>
            <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
              Experience
            </h2>
            <div className="mt-6">
              <Timeline items={experience} />
            </div>
          </div>

          <div>
            <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
              Engineering Philosophy
            </h2>
            <div className="mt-6 space-y-4 text-[var(--color-text-secondary)]">
              <p>
                Ship working software, then iterate. A deployed product that helps
                someone beats a perfect architecture that never launches.
              </p>
              <p>
                Build for the constraints you actually have. If your users are on
                3G connections and mid-range Android devices, your performance
                budget starts there — not on your development laptop.
              </p>
              <p>
                Write code that the next developer (including future you) can
                understand without a walkthrough. Complexity should be justified
                by the problem, not the solution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
