import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for the ochiengpaul.com portfolio website.',
  openGraph: {
    title: 'Terms of Use | Paul Ochieng Levi',
    description: 'Terms governing use of the ochiengpaul.com portfolio website.',
    url: '/terms',
  },
  alternates: { canonical: '/terms' },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Terms of Use</h1>
        <p className="mt-2 font-mono text-sm text-[var(--color-text-tertiary)]">Last updated: 2 August 2026</p>
        <div className="prose mt-8 max-w-none text-[var(--color-text-secondary)]">
          <p>
            These terms apply to your use of ochiengpaul.com, a personal portfolio website operated by Paul Ochieng Levi in Kampala, Uganda. By using the website, you agree to use it lawfully and respectfully.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Website content</h2>
          <p>
            Portfolio text, original graphics, code samples, case studies, and other materials are provided for information and professional review. Unless a page or repository states otherwise, you may not copy, republish, sell, or present this material as your own without written permission.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">External links and services</h2>
          <p>
            This website links to services including GitHub, LinkedIn, X/Twitter, Google services, Resend, and Exceeds. Those services operate independently and have their own terms and privacy notices. Paul Ochieng Levi is not responsible for their availability, content, security, or data practices.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Contact form</h2>
          <p>
            You agree not to submit unlawful, abusive, malicious, or confidential information through the contact form. Do not send passwords, payment details, health information, trade secrets, or other sensitive material. The contact form is for genuine professional enquiries and is subject to the Privacy Policy.
          </p>
          <p>
            The contact form uses Cloudflare Turnstile and server-side rate
            limiting to reduce automated abuse. Submissions may be rejected if
            the security verification fails or the request exceeds the rate
            limit.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Portfolio assistant</h2>
          <p>
            The portfolio assistant is provided for general information about
            Paul Ochieng Levi&apos;s public work. Responses may be incomplete,
            outdated, or incorrect and are not professional advice. Chat
            sessions are temporary and are cleared when you close the chat.
            Please do not submit passwords, payment details, health information,
            trade secrets, or other confidential material.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Availability and disclaimer</h2>
          <p>
            The website and its content are provided on an “as available” basis. Reasonable care is taken to keep information accurate, but no guarantee is made that the website will always be complete, current, uninterrupted, or error-free. Portfolio material is not legal, financial, medical, security, or other professional advice.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Changes and contact</h2>
          <p>
            These terms may be updated when the website or its services change. The latest version will be published on this page. Questions about these terms can be sent to <a href="mailto:paul.ochieng.dev@gmail.com" className="text-[var(--color-accent)] underline underline-offset-2">paul.ochieng.dev@gmail.com</a>.
          </p>
          <p>
            This is practical website copy, not a substitute for advice from a qualified lawyer familiar with the laws that apply to you and your visitors.
          </p>
        </div>
      </div>
    </section>
  );
}
