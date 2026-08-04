import { SITE_URL } from './site';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function homepageBreadcrumbs() {
  return buildBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
  ]);
}

export function aboutBreadcrumbs() {
  return buildBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'About', url: '/about' },
  ]);
}

export function workBreadcrumbs() {
  return buildBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Work', url: '/work' },
  ]);
}

export function projectBreadcrumbs(slug: string, title: string) {
  return buildBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Work', url: '/work' },
    { name: title, url: `/work/${slug}` },
  ]);
}

export function engineeringBreadcrumbs() {
  return buildBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Engineering', url: '/engineering' },
  ]);
}

export function nowBreadcrumbs() {
  return buildBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Now', url: '/now' },
  ]);
}

export function contactBreadcrumbs() {
  return buildBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Contact', url: '/contact' },
  ]);
}
