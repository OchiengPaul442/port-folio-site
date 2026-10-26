export function getSiteOrigin(value?: string): URL | null {
  const configuredSiteUrl = value?.trim();
  if (!configuredSiteUrl) return null;

  // Deployment providers often expose a hostname without a scheme. URL
  // requires an absolute URL, so treat a bare hostname as HTTPS.
  const absoluteUrl = /^[a-z][a-z\d+.-]*:\/\//i.test(configuredSiteUrl)
    ? configuredSiteUrl
    : `https://${configuredSiteUrl}`;

  try {
    const parsedUrl = new URL(absoluteUrl);
    const isHttps = parsedUrl.protocol === 'https:';
    const isLocalHttp =
      parsedUrl.protocol === 'http:' &&
      (parsedUrl.hostname === 'localhost' ||
        parsedUrl.hostname === '127.0.0.1' ||
        parsedUrl.hostname === '[::1]' ||
        parsedUrl.hostname.endsWith('.localhost'));

    return isHttps || isLocalHttp ? parsedUrl : null;
  } catch {
    return null;
  }
}

export function getCanonicalSiteOrigin(value?: string): URL {
  return getSiteOrigin(value) ?? new URL('https://www.ochiengpaul.com');
}

export function shouldRedirectToCanonicalOrigin(
  requestHostname: string,
  requestProtocol: string,
  canonicalHost: string,
  canonicalProtocol: string,
): boolean {
  const canonicalHostname = new URL(`${canonicalProtocol}://${canonicalHost}`).hostname;
  return (
    requestHostname.toLowerCase() !== canonicalHostname.toLowerCase() ||
    requestProtocol !== canonicalProtocol
  );
}

export function shouldApplyCanonicalRedirect(
  nodeEnvironment: string | undefined,
  vercelEnvironment: string | undefined,
  isLocalHost: boolean,
): boolean {
  return nodeEnvironment === 'production' && vercelEnvironment !== 'preview' && !isLocalHost;
}

export function buildCanonicalRedirectUrl(
  currentUrl: URL,
  canonicalProtocol: string,
  canonicalHost: string,
  canonicalPort?: string,
): URL {
  const canonicalUrl = new URL(currentUrl);
  canonicalUrl.protocol = `${canonicalProtocol}:`;
  canonicalUrl.host = canonicalHost;
  if (canonicalPort !== undefined) canonicalUrl.port = canonicalPort;
  return canonicalUrl;
}

const configuredSiteOrigin = getCanonicalSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);

export const SITE_URL = configuredSiteOrigin.origin;
export const SITE_HOME_URL = SITE_URL;
export const SITE_NAME = 'Paul Ochieng Levi';
export const SITE_TITLE = 'Paul Ochieng | Software Engineer in Kampala, Uganda';
export const SITE_DESCRIPTION =
  'Paul Ochieng is a software engineer in Kampala, Uganda building web products with React, Next.js, and TypeScript, alongside APIs and AI applications. Explore selected case studies and open-source work.';

export const SOCIAL_PROFILES = [
  'https://github.com/OchiengPaul442',
  'https://www.linkedin.com/in/paulochieng442/',
  'https://twitter.com/OchiengTech',
];
