import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Paul Ochieng Levi — open to full-time roles, remote engineering, climate-tech collaboration, and consulting.',
};

export default function ContactPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Contact
        </h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          I&apos;m open to opportunities and collaboration. Here are some reasons
          to reach out:
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
            <h2 className="font-semibold text-[var(--color-text-primary)]">Full-Time Roles</h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              Software engineering positions focused on AI, environmental tech,
              or product infrastructure. Remote-first preferred.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
            <h2 className="font-semibold text-[var(--color-text-primary)]">Climate-Tech Collaboration</h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              Working with organizations focused on environmental data,
              air quality monitoring, or sustainability technology in Africa.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
            <h2 className="font-semibold text-[var(--color-text-primary)]">Consulting</h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              Short-term engagements for AI integration, API development,
              or frontend architecture. Especially for African market constraints.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
            <h2 className="font-semibold text-[var(--color-text-primary)]">Open Source</h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              Collaborating on open-source projects related to AI agents,
              developer tools, or environmental technology.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Send a Message
          </h2>
          <div className="mt-6 max-w-lg">
            <ContactForm />
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--color-border)] pt-8">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Other Channels
          </h2>
          <div className="mt-4 flex flex-wrap gap-6">
            <a
              href="mailto:paul@example.com"
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
            >
              paul@example.com
            </a>
            <a
              href="https://github.com/OchiengPaul442"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/OchiengTech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
