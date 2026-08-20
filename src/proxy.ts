import { NextRequest, NextResponse } from 'next/server';
import { getSiteOrigin } from '@/lib/site';

export function proxy(request: NextRequest) {
  const hostname = request.nextUrl.hostname.toLowerCase();
  const forwardedProtocol = request.headers.get('x-forwarded-proto')?.split(',')[0].trim();
  const protocol = forwardedProtocol || request.nextUrl.protocol.replace(':', '');
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const configuredOrigin = getSiteOrigin(configuredSiteUrl);

  const expectedProtocol =
    configuredOrigin?.protocol.replace(':', '') ||
    (process.env.NODE_ENV === 'production' ? 'https' : protocol);
  const expectedHost = configuredOrigin?.host || request.nextUrl.host;
  const shouldUseCanonicalOrigin =
    hostname !== expectedHost.split(':')[0].toLowerCase() || protocol !== expectedProtocol;

  // Keep one crawlable URL for the portfolio. This consolidates the naked
  // domain and HTTP variants before Google has to choose between them.
  // Production-only: the redirect must not fire in development, where
  // NEXT_PUBLIC_SITE_URL points at the production domain but the host is localhost.
  if (shouldUseCanonicalOrigin && process.env.NODE_ENV === 'production') {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.protocol = `${expectedProtocol}:`;
    canonicalUrl.host = expectedHost;
    return NextResponse.redirect(canonicalUrl, 308);
  }

  const response = NextResponse.next();

  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://www.googletagmanager.com https://translate.google.com blob:",
    "style-src 'self' 'unsafe-inline' blob: https://fonts.googleapis.com https://translate.google.com",
    "img-src 'self' data: blob: https://avatars.githubusercontent.com https://www.google.com https://www.gstatic.com https://challenges.cloudflare.com https://translate.google.com",
    "font-src 'self' blob: data: https://fonts.gstatic.com",
    "connect-src 'self' blob: https://challenges.cloudflare.com https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://translate.googleapis.com https://translate.google.com",
    "frame-src 'self' https://challenges.cloudflare.com https://www.google.com https://translate.google.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  );

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/data|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|brand/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
