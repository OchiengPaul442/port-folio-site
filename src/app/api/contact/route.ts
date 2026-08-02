import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address'),
  subject: z.string().trim().min(1, 'Subject is required').max(200),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000),
  website: z.string().max(0),
  turnstileToken: z.string().trim().min(1, 'Security verification is required').max(2048),
});

type TurnstileVerification = {
  success: boolean;
  hostname?: string;
  action?: string;
  'error-codes'?: string[];
};

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] ?? character);
}

function readEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  if (!value) return undefined;

  // Local .env files use quotes for values containing spaces, but hosting
  // dashboards usually store the value without shell syntax. Accept either.
  return value.replace(/^("|')([\s\S]*)\1$/, '$2').trim() || undefined;
}

export async function POST(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      fieldErrors[field] = issue.message;
    });
    return NextResponse.json({ error: 'Validation failed', fields: fieldErrors }, { status: 400 });
  }

  const { name, email, subject, message } = result.data;
  const { turnstileToken } = result.data;

  const turnstileSecret = readEnv('TURNSTILE_SECRET_KEY');
  const allowedHostnames = new Set(
    (readEnv('TURNSTILE_ALLOWED_HOSTNAMES') ?? '')
      .split(',')
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean),
  );

  if (!turnstileSecret || allowedHostnames.size === 0) {
    console.error('Turnstile is not configured. Set TURNSTILE_SECRET_KEY and TURNSTILE_ALLOWED_HOSTNAMES.');
    return NextResponse.json({ error: 'Security verification is temporarily unavailable.' }, { status: 503 });
  }

  const visitorIp =
    request.headers.get('cf-connecting-ip')?.trim() ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();

  let verification: TurnstileVerification;
  try {
    const verificationResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: turnstileToken,
          ...(visitorIp ? { remoteip: visitorIp } : {}),
        }),
        cache: 'no-store',
        signal: AbortSignal.timeout(10_000),
      },
    );

    if (!verificationResponse.ok) {
      throw new Error(`Turnstile verification returned ${verificationResponse.status}`);
    }

    verification = (await verificationResponse.json()) as TurnstileVerification;
  } catch (error) {
    console.error('Turnstile verification request failed:', error);
    return NextResponse.json({ error: 'Security verification is temporarily unavailable.' }, { status: 503 });
  }

  const verifiedHostname = verification.hostname?.toLowerCase();
  const isLocalVerification =
    allowedHostnames.has('localhost') ||
    allowedHostnames.has('127.0.0.1') ||
    allowedHostnames.has('0.0.0.0');
  const allowedActions = isLocalVerification
    ? new Set(['contact_form', 'test'])
    : new Set(['contact_form']);
  const hostnameMatches = verifiedHostname
    ? allowedHostnames.has(verifiedHostname)
    : false;
  const actionMatches = verification.action
    ? allowedActions.has(verification.action)
    : false;
  const verificationAccepted = isLocalVerification
    ? verification.success
    : verification.success &&
      hostnameMatches &&
      actionMatches;

  if (!verificationAccepted) {
    console.warn('Rejected Turnstile verification', {
      hostname: verification.hostname,
      action: verification.action,
      errors: verification['error-codes'],
    });
    return NextResponse.json(
      {
        error: 'Security verification failed. Please try again.',
        ...(isLocalVerification
          ? {
              turnstile: {
                success: verification.success,
                hostname: verification.hostname,
                action: verification.action,
                errors: verification['error-codes'],
              },
            }
          : {}),
      },
      { status: 403 },
    );
  }

  const apiKey = readEnv('RESEND_API_KEY');
  const to = readEnv('CONTACT_TO_EMAIL') || 'paul.ochieng.dev@gmail.com';
  const configuredFrom = readEnv('CONTACT_FROM_EMAIL');
  const from = configuredFrom
    ? configuredFrom.includes('<')
      ? configuredFrom
      : `Paul Ochieng Levi <${configuredFrom}>`
    : undefined;

  if (!apiKey || !from) {
    console.error('Contact email is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL.');
    return NextResponse.json({ error: 'Email delivery is temporarily unavailable.' }, { status: 503 });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');
  // Keep the transport subject stable and predictable. Visitor-controlled
  // text belongs in the body, not the subject line, where it can resemble
  // spam or create misleading headers.
  const emailSubject = '[ochiengpaul.com] New contact form message';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': crypto.randomUUID(),
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: emailSubject,
        text: [
          'A new message was submitted through the ochiengpaul.com contact form.',
          '',
          `Name: ${name}`,
          `Email: ${email}`,
          `Subject: ${subject}`,
          '',
          'Message:',
          message,
        ].join('\n'),
        html: `<p>A new message was submitted through the ochiengpaul.com contact form.</p><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Subject:</strong> ${safeSubject}</p><p><strong>Message:</strong><br />${safeMessage}</p>`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const providerError = await response.text();
      console.error('Resend rejected contact email:', response.status, providerError);
      return NextResponse.json({ error: 'Email delivery is temporarily unavailable.' }, { status: 502 });
    }
  } catch (error) {
    console.error('Contact email delivery failed:', error);
    return NextResponse.json({ error: 'Email delivery is temporarily unavailable.' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
