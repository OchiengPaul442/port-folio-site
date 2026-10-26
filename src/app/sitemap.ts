import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/projects';
import { SITE_URL } from '@/lib/site';
import { createSitemapEntries } from '@/lib/sitemap-utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const projectSlugs = getAllProjects().map((project) => project.slug);
  return createSitemapEntries(SITE_URL, projectSlugs);
}
