import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for ochiengpaul.com — how Paul Ochieng Levi collects, uses, and protects personal data on this portfolio website.',
  openGraph: {
    title: 'Privacy Policy | Paul Ochieng Levi',
    description: 'Privacy policy for ochiengpaul.com portfolio website.',
    url: '/privacy',
  },
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Privacy Policy
        </h1>
        <p className="mt-2 font-mono text-sm text-[var(--color-text-tertiary)]">
          Last updated: 2 August 2026
        </p>
        <div className="prose mt-8 max-w-none text-[var(--color-text-secondary)]">
          <p>
            This website is operated by Paul Ochieng Levi in Kampala, Uganda. It
            is a personal portfolio and is not intended for children. This policy
            explains what information this site handles, why it is handled, who
            receives it, and how you can exercise your privacy rights.
          </p>

          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Information I receive</h2>
          <p>
            If you use the contact form, I receive your name, email address,
            subject, and message. The form also uses a hidden anti-spam field,
            and the server temporarily uses the request IP address for rate
            limiting. The IP address is not included in the contact email and is
            not stored in a separate database by this application.
          </p>
          <p>
            This site does not ask for or intentionally collect sensitive
            personal information. Please do not include passwords, payment
            details, health information, or other confidential information in a
            message.
          </p>

          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">How information is used</h2>
          <p>
            Contact details and message content are used to read, respond to,
            and manage your enquiry. They are not sold, used for advertising, or
            added to a marketing list. This processing is triggered by your
            request for a response. Optional Analytics data is processed only
            after your consent, to understand aggregate visits and improve the
            site.
          </p>

          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Third-party services</h2>
          <p>
            Contact messages are sent through Resend, a transactional email
            provider, to <a href="mailto:paul.ochieng.dev@gmail.com" className="text-[var(--color-accent)] underline underline-offset-2">paul.ochieng.dev@gmail.com</a>.
            Your message and email address may therefore be processed by Resend
            and by the email provider hosting that mailbox. The message is sent
            with your email as the reply-to address so that I can respond.
          </p>
          <p>
            Public GitHub contribution data shown on the home page is requested
            from a public GitHub contribution service through this site&apos;s
            server and is cached for up to 24 hours. The site does not receive
            your GitHub account information from that feature.
          </p>
          <p>
            Links to GitHub, LinkedIn, and Twitter/X take you to those services.
            They may collect information under their own policies once you leave
            this site.
          </p>
          <p>
            The Engineering Profile page links to a public profile hosted by
            Exceeds. This site does not copy, store, or send your information to
            Exceeds through that link. Exceeds may process visitors under its
            own terms and privacy notice once you open the external profile.
          </p>

          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Cookies and local storage</h2>
          <p>
            The site uses browser storage for functional preferences: your
            selected language and your Analytics consent choice. These choices
            help the interface remember your settings and do not contain form
            messages.
          </p>
          <p>
            Google Translate may set a <code>googtrans</code> cookie when you
            request a translation. It is used to remember the selected
            translation. Google Analytics uses its own cookies only after you
            choose “Accept analytics” in the consent banner. You can reject
            optional Analytics or change the choice later with “Privacy settings”
            in the footer.
          </p>

          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Analytics consent</h2>
          <p>
            Google Analytics 4 is optional and is not loaded before consent. If
            enabled, Google may process browser, device, approximate location,
            page-view, and visit information. Analytics is configured with IP
            anonymization and advertising storage is disabled. No contact form
            content is sent to Analytics. Rejecting Analytics does not affect
            access to the site or the contact form.
          </p>

          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Retention</h2>
          <p>
            The portfolio does not store contact submissions in its own database.
            I may retain correspondence in the receiving email account only as
            long as reasonably necessary to respond, maintain a professional
            record, or resolve a follow-up. You can request deletion of a
            message at any time, subject to legitimate record-keeping or legal
            requirements. Provider retention and backups may continue according
            to the relevant provider&apos;s policy.
          </p>

          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Security</h2>
          <p>
            The application uses HTTPS in production, server-side validation,
            HTML escaping, a honeypot field, request rate limiting, and a
            server-only email API key. No security measure is perfect, so please
            avoid sending sensitive information through the form.
          </p>

          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Your rights</h2>
          <p>
            Subject to applicable law, you may ask what personal information I
            hold about you, request correction or deletion, object to or limit
            processing, withdraw Analytics consent, or ask questions about how
            your information is used. To make a request, email{' '}
            <a href="mailto:paul.ochieng.dev@gmail.com" className="text-[var(--color-accent)] underline underline-offset-2">paul.ochieng.dev@gmail.com</a>.
            I may need to verify your identity before fulfilling a request.
          </p>

          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Changes to this policy</h2>
          <p>
            This policy may be updated when the site, services, or legal
            requirements change. The latest version will always be published on
            this page with its updated date.
          </p>

          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Contact</h2>
          <p>
            For privacy questions or requests, email{' '}
            <a href="mailto:paul.ochieng.dev@gmail.com" className="text-[var(--color-accent)] underline underline-offset-2">paul.ochieng.dev@gmail.com</a>{' '}
            or use the{' '}
            <a href="/contact" className="text-[var(--color-accent)] underline underline-offset-2">contact page</a>.
            You may also contact Uganda&apos;s{' '}
            <a href="https://pdpo.go.ug/information-center/individual" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline underline-offset-2">Personal Data Protection Office</a>{' '}
            if you believe your rights have been infringed.
          </p>
        </div>
      </div>
    </section>
  );
}
