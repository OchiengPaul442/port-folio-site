import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/projects';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects().map((project) => ({
    url: `${SITE_URL}/work/${project.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/work`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...projects,
    {
      url: `${SITE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/now`,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/engineering`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
