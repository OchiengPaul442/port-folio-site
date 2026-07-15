import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content', 'projects');

function getProjectMtime(slug: string): Date {
  try {
    const stat = fs.statSync(path.join(contentDir, `${slug}.json`));
    return stat.mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://paul.dev';
  const now = new Date();

  const projects = [
    'aeris-aq',
    'airqo-web-db',
    'builld',
    'coinz',
    'dawa-ug',
    'ledgerbloom',
    'nexcode',
    'nexus-airqo',
    'pdf-viewer',
    'pulse',
    'saving-food',
  ].map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: getProjectMtime(slug),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...projects,
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/now`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
