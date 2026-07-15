import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/resume/paul-ochieng-levi-resume.pdf'],
      },
    ],
    sitemap: 'https://paul.dev/sitemap.xml',
  };
}
