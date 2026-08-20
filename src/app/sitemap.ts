import fs from 'fs';
import path from 'path';
import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/projects';
import { SITE_URL } from '@/lib/site';

function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

function projectLastmod(slug: string): string {
  try {
    const filePath = path.join(process.cwd(), 'content', 'projects', `${slug}.json`);
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
  } catch {
    return todayISO();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const today = todayISO();

  const projects = getAllProjects().map((project) => ({
    url: `${SITE_URL}/work/${project.slug}`,
    lastModified: projectLastmod(project.slug),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...projects,
    {
      url: `${SITE_URL}/about`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/now`,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/engineering`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
