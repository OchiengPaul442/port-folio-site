'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { z } from 'zod';
import { CheckCircle2, MailPlus } from 'lucide-react';

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: {
        sitekey: string;
        action: string;
        theme: 'auto';
        'expired-callback'?: (token: string) => void;
        'error-callback'?: (error: string) => void;
      }) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address'),
  subject: z.string().trim().min(1, 'Subject is required').max(200),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000),
  website: z.string().max(0),
});

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [turnstileReady, setTurnstileReady] = useState(false);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  // Honeypot hardening: clear the website input value on mount to prevent
  // browser autofill from triggering the silent-success bot path.
  useEffect(() => {
    const websiteInput = document.getElementById('website') as HTMLInputElement | null;
    if (websiteInput) websiteInput.value = '';
  }, []);

  useEffect(() => {
    if (
      !turnstileReady ||
      !turnstileSiteKey ||
      !turnstileContainerRef.current ||
      !window.turnstile ||
      turnstileWidgetIdRef.current
    ) {
      return;
    }

    const widgetId = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: turnstileSiteKey,
      action: 'contact_form',
      theme: 'auto',
      'expired-callback': () => {
        setErrors({ form: 'Security verification expired. Please complete the check again.' });
      },
      'error-callback': () => {
        setErrors({ form: 'Security verification failed. Please try again.' });
      },
    });
    turnstileWidgetIdRef.current = widgetId;
  }, [turnstileReady]);

  function resetTurnstile() {
    if (turnstileWidgetIdRef.current) {
      window.turnstile?.reset(turnstileWidgetIdRef.current);
    }
  }

  function handleSendAnother() {
    setErrors({});
    setStatus('idle');
    resetTurnstile();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      website: formData.get('website') as string,
      turnstileToken: formData.get('cf-turnstile-response') as string,
    };

    if (data.website) {
      setStatus('success');
      return;
    }

    if (!data.turnstileToken) {
      setErrors({ form: 'Please complete the security check before sending your message.' });
      return;
    }

    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, turnstileToken: data.turnstileToken }),
      });

      if (!res.ok) {
        resetTurnstile();
        const body = await res.json().catch(() => ({}));
        if (res.status === 429) {
          setErrors({ form: 'Too many requests. Please try again later.' });
          setStatus('idle');
          return;
        }
        if (res.status >= 500) {
          setErrors({ form: 'Email delivery is temporarily unavailable. Please email me directly.' });
          setStatus('idle');
          return;
        }
        if (body.fields) setErrors(body.fields);
        setStatus('error');
        return;
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      resetTurnstile();
      setErrors({
        form: err instanceof TypeError
          ? 'Could not connect to the server. Check your connection and try again.'
          : 'Something went wrong. Please try again or email me directly.',
      });
    }
  }

  const isShowingForm = status !== 'success';

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onReady={() => setTurnstileReady(true)}
      />

      {status === 'success' && (
        <div
          className="rounded-xl border border-[var(--color-success-text)]/20 bg-[var(--color-success-bg)] p-6 sm:p-7"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-success-text)]" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-[var(--color-success-text)]">
                Message sent successfully.
              </p>
              <p className="mt-1 text-sm text-[var(--color-success-text)]/80">
                Thanks for reaching out. I&apos;ll get back to you soon.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[var(--color-success-text)]/15 pt-5">
            <button
              type="button"
              onClick={handleSendAnother}
              className="inline-flex items-center gap-2 rounded-md bg-[var(--color-success-text)] px-4 py-2.5 text-sm font-semibold text-[var(--color-success-bg)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-success-text)]"
            >
              <MailPlus className="h-4 w-4" aria-hidden="true" />
              Send another message
            </button>
            <a
              href="mailto:paul.ochieng.dev@gmail.com"
              className="text-sm font-medium text-[var(--color-success-text)] underline decoration-[var(--color-success-text)]/40 underline-offset-4 hover:decoration-[var(--color-success-text)]"
            >
              Email directly
            </a>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`space-y-6 ${isShowingForm ? '' : 'hidden'}`}
        noValidate
        aria-hidden={!isShowingForm}
      >
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text-primary)]">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className="mt-1 block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
          />
          {errors.name && <p id="name-error" className="mt-1 text-xs text-[var(--color-error)]">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-primary)]">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="mt-1 block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
          />
          {errors.email && <p id="email-error" className="mt-1 text-xs text-[var(--color-error)]">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-[var(--color-text-primary)]">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            autoComplete="on"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            className="mt-1 block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
          />
          {errors.subject && <p id="subject-error" className="mt-1 text-xs text-[var(--color-error)]">{errors.subject}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text-primary)]">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            autoComplete="on"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className="mt-1 block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
          />
          {errors.message && <p id="message-error" className="mt-1 text-xs text-[var(--color-error)]">{errors.message}</p>}
        </div>

        {errors.form && <p role="alert" className="text-xs text-[var(--color-error)]">{errors.form}</p>}

        <div className="space-y-2">
          {turnstileSiteKey ? (
            <div ref={turnstileContainerRef} aria-label="Security verification" />
          ) : (
            <p className="text-xs text-[var(--color-error)]">
              Security verification is not configured. Please email me directly instead.
            </p>
          )}
          <p className="text-xs text-[var(--color-text-tertiary)]">
            This security check helps prevent automated spam. See the <a href="/privacy" className="underline underline-offset-2">Privacy Policy</a> for details.
          </p>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-accent-text)] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] disabled:opacity-50 min-h-11 min-w-11"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'error' && (
          <p className="text-xs text-[var(--color-error)]">
            Something went wrong. Please try again or email me directly.
          </p>
        )}
      </form>
    </>
  );
}
