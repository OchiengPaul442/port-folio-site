export function getSiteOrigin(value?: string): URL | null {
  const configuredSiteUrl = value?.trim();
  if (!configuredSiteUrl) return null;

  // Deployment providers often expose a hostname without a scheme. URL
  // requires an absolute URL, so treat a bare hostname as HTTPS.
  const absoluteUrl = /^[a-z][a-z\d+.-]*:\/\//i.test(configuredSiteUrl)
    ? configuredSiteUrl
    : `https://${configuredSiteUrl}`;

  try {
    return new URL(absoluteUrl);
  } catch {
    return null;
  }
}

const configuredSiteOrigin = getSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);

export const SITE_URL = configuredSiteOrigin?.origin || 'http://localhost:3000';
export const SITE_NAME = 'Paul Ochieng Levi';
export const SITE_TITLE =
  'Full-Stack Engineer in Kampala, Uganda | Paul Ochieng';
export const SITE_DESCRIPTION =
  'Paul Ochieng is a full-stack software engineer in Kampala, Uganda building reliable Next.js applications, Python APIs, AI tools, and data platforms.';

export const SITE_KEYWORDS = [
  'Paul Ochieng Levi',
  'Paul Ochieng',
  'software engineer Uganda',
  'software engineer Kampala',
  'full-stack engineer Uganda',
  'full-stack developer Kampala',
  'Next.js developer Uganda',
  'React developer Uganda',
  'TypeScript developer',
  'Python developer',
  'FastAPI developer',
  'Django developer',
  'AI developer Uganda',
  'developer tools',
  'environmental technology',
  'air quality software',
  'data platforms',
];

export const SOCIAL_PROFILES = [
  'https://github.com/OchiengPaul442',
  'https://www.linkedin.com/in/paulochieng442/',
  'https://twitter.com/OchiengTech',
];
