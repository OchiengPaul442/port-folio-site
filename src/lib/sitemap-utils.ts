/**
 * Editorial allow-list for project case studies submitted for indexing.
 * This includes selected, substantive case studies. Secondary demos remain
 * available in the archive without competing with the main portfolio pages.
 */
export const INDEXABLE_PROJECT_SLUGS = [
  'aeris-aq',
  'airqo-icons-flutter',
  'airqo-npm-packages',
  'airqo-web-db',
  'airqo-website',
  'aqmrg',
  'builld',
  'coinz',
  'dawa-ug',
  'ledgerbloom',
  'mizani',
  'nexcode',
  'nexus-airqo',
  'oncallug-drivers',
  'paul-portfolio-agent',
  'pdf-viewer',
  'picsa-app',
  'saving-food',
  'sentsafrica',
  'sti',
] as const;

const INDEXABLE_STATIC_PATHS = [
  '/work',
  '/about',
  '/now',
  '/contact',
  '/engineering',
] as const;

export function isIndexableProjectSlug(slug: string): boolean {
  return (INDEXABLE_PROJECT_SLUGS as readonly string[]).includes(slug);
}

export function createSitemapEntries(siteOrigin: string, projectSlugs: string[]) {
  const origin = new URL(siteOrigin).origin;
  const uniqueProjectSlugs = [...new Set(projectSlugs)];

  return [
    { url: origin },
    ...INDEXABLE_STATIC_PATHS.map((path) => ({ url: `${origin}${path}` })),
    ...uniqueProjectSlugs
      .filter(isIndexableProjectSlug)
      .map((slug) => ({ url: `${origin}/work/${encodeURIComponent(slug)}` })),
  ];
}
