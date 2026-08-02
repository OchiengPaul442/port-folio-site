import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { ScrollReveal } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Paul Ochieng Levi — full-stack software engineer in Kampala, Uganda. Open to full-time roles, remote engineering, climate-tech collaboration, and consulting.',
  openGraph: {
    title: 'Contact Paul Ochieng Levi',
    description: 'Full-stack software engineer open to opportunities and collaboration.',
    url: 'https://www.ochiengpaul.com/contact',
  },
  alternates: {
    canonical: 'https://www.ochiengpaul.com/contact',
  },
};

export default function ContactPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Contact
          </h1>
          <p className="mt-2 text-base text-[var(--color-text-secondary)]">
            I&apos;m open to thoughtful engineering opportunities, collaborations, and
            conversations about building useful software.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 items-stretch">
          <ScrollReveal delay={0.05} className="h-full">
            <div className="card h-full">
              <h2 className="font-semibold text-[var(--color-text-primary)]">Full-Time Roles</h2>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                Product-minded frontend, backend, or full-stack roles. I&apos;m especially
                interested in teams that care about quality, users, and momentum.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="h-full">
            <div className="card h-full">
              <h2 className="font-semibold text-[var(--color-text-primary)]">Climate-Tech Collaboration</h2>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                Working with organizations focused on environmental data,
                air quality monitoring, or sustainability technology in Africa.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="h-full">
            <div className="card h-full">
              <h2 className="font-semibold text-[var(--color-text-primary)]">Consulting</h2>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                Short-term engagements for frontend architecture, APIs, integrations,
                and turning a product idea into a focused first release.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="h-full">
            <div className="card h-full">
              <h2 className="font-semibold text-[var(--color-text-primary)]">Open Source</h2>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                Collaborating on projects around developer experience, public-good
                technology, useful data, and the open web.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.24}>
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              Send a Message
            </h2>
            <p className="mt-2 max-w-lg text-xs leading-5 text-[var(--color-text-tertiary)]">
              Your message is sent to Paul through a transactional email provider
              so he can respond. Please do not include sensitive information. See
              the <a href="/privacy" className="text-[var(--color-accent)] underline underline-offset-2">Privacy Policy</a> for details.
            </p>
            <div className="mt-6 max-w-lg">
              <ContactForm />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.28}>
          <div className="mt-12 border-t border-[var(--color-border)] pt-8">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              Other Channels
            </h2>
            <div className="mt-4 flex flex-wrap gap-6">
              <a
                href="https://github.com/OchiengPaul442"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/paulochieng442/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com/OchiengTech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                Twitter
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
