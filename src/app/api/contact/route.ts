import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address'),
  subject: z.string().trim().min(1, 'Subject is required').max(200),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000),
  website: z.string().max(0),
});

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
  const cleanSubject = subject.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();

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
        subject: `New portfolio enquiry - ${cleanSubject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Subject:</strong> ${safeSubject}</p><p>${safeMessage}</p>`,
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
