import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Professional resume of Paul Ochieng Levi — software engineer specializing in AI tools and environmental data platforms.',
};

export default function ResumePage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
              Resume
            </h1>
            <p className="mt-2 text-[var(--color-text-secondary)]">
              On-page summary for crawlability. PDF download available.
            </p>
          </div>
          <a
            href="/resume/paul-ochieng-levi-resume.pdf"
            download
            className="inline-flex items-center rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
          >
            Download PDF
          </a>
        </div>

        <div className="mt-10 space-y-10">
          {/* Header */}
          <div className="border-b border-[var(--color-border)] pb-6">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
              Paul Ochieng Levi
            </h2>
            <p className="mt-1 text-[var(--color-text-secondary)]">
              Software Engineer &middot; Kampala, Uganda
            </p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-[var(--color-text-tertiary)]">
              <a href="https://github.com/OchiengPaul442" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)]">
                github.com/OchiengPaul442
              </a>
              <a href="https://twitter.com/OchiengTech" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)]">
                @OchiengTech
              </a>
              <a href="mailto:paul@example.com" className="hover:text-[var(--color-accent)]">
                paul@example.com
              </a>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
              Summary
            </h2>
            <p className="mt-3 text-[var(--color-text-secondary)]">
              Software engineer specializing in AI-powered tools,
              environmental-data platforms, and product infrastructure.
              Experience building local-first AI coding agents, scalable
              REST APIs, and internationalized web applications serving
              African communities. Focus on low-bandwidth performance,
              multi-language support, and privacy-first architecture.
            </p>
          </div>

          {/* Skills */}
          <div>
            <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
              Technical Skills
            </h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Languages</h3>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  TypeScript, Python, JavaScript, PHP
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Frameworks</h3>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  React, Next.js, Django, VS Code Extension API
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">AI/ML</h3>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  LangGraph, Ollama, LiteLLM, ChromaDB
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Infrastructure</h3>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  PostgreSQL, Redis, Docker, Vercel, Cloudflare
                </p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
              Experience
            </h2>
            <div className="mt-4 space-y-6">
              <div>
                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                  AI Agent Developer
                </h3>
                <p className="font-mono text-xs text-[var(--color-text-tertiary)]">
                  Personal Projects &middot; 2024 — Present
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  Building local-first AI coding agents (Pulse, NexCode) with
                  multi-model routing, workspace awareness, and privacy-first
                  architecture. VS Code extensions using Ollama for local
                  inference.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                  Frontend & Backend Contributor
                </h3>
                <p className="font-mono text-xs text-[var(--color-text-tertiary)]">
                  AirQo Platform &middot; 2022 — Present
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  Contributing to AirQo&apos;s website internationalization
                  supporting 40+ languages including several African languages.
                  REST API development with Django REST Framework. Dashboard
                  components for air quality monitoring.
                </p>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
              Key Projects
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                  Pulse — Local AI Coding Agent
                </h3>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  VS Code extension turning the editor into a local coding agent
                  powered by Ollama. Workspace-aware, multi-model routing, session
                  memory. TypeScript, LangGraph, ChromaDB.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                  AirQo Website API
                </h3>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  High-performance REST API backend for air quality data.
                  Django REST Framework, PostgreSQL, Redis caching, OpenAPI docs.
                  Powers airqo.africa.
                </p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="border-t border-[var(--color-border)] pt-6">
            <Link
              href="/"
              className="text-sm font-medium text-[var(--color-accent)] hover:underline underline-offset-2"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
