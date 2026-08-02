import type { MetadataRoute } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'Paul Ochieng',
    description: 'Portfolio of Paul Ochieng Levi, full-stack software engineer in Kampala, Uganda.',
    start_url: SITE_URL,
    display: 'standalone',
    background_color: '#17171c',
    theme_color: '#17171c',
    icons: [
      { src: '/brand/logo-transparent-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/logo-transparent-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
