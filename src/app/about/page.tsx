import type { Metadata } from 'next';
import { Timeline } from '@/components/Timeline';
import { ScrollReveal } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Paul Ochieng Levi — a full-stack software engineer in Kampala, Uganda building thoughtful digital products and dependable systems.',
};

const experience = [
  {
    period: 'Current Focus',
    title: 'Applied AI & Developer Tools',
    description:
      'Exploring local-first developer tools with an emphasis on useful workflows, privacy, and performance on everyday hardware.',
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
      'Building web applications across the stack with TypeScript, React, Next.js, Python, Django, and PostgreSQL — from interface design through production APIs.',
  },
];

export default function AboutPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
            About
          </h1>
          <p className="mt-2 text-base text-[var(--color-text-secondary)]">
            Software engineer, builder, curious mind.
          </p>
        </ScrollReveal>

        <div className="mt-10 space-y-10">
          <ScrollReveal delay={0.08}>
            <div className="prose max-w-none">
              <p>
                I&apos;m Paul Ochieng Levi, a software engineer based in Kampala, Uganda.
                I build digital products from interface to infrastructure: responsive
                web applications, useful APIs, and the systems that connect them.
              </p>
              <p>
                I enjoy working across the stack because the best product decisions
                happen when design, data, and implementation inform one another.
                I&apos;ve contributed to AirQo&apos;s platform serving air quality data across
                African communities, and I also build product tools, marketplaces,
                and developer experiences.
              </p>
              <p>
                I care about low-bandwidth performance, multi-language support, and
                software that respects its users&apos; actual conditions. Good technology
                begins with local constraints, clear communication, and a willingness
                to make the complex feel straightforward.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div>
              <h2 className="section-label">
                Experience
              </h2>
              <div className="mt-6">
                <Timeline items={experience} />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <div>
              <h2 className="section-label">
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
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
