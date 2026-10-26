import {
  SITE_DESCRIPTION,
  SITE_HOME_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_PROFILES,
} from './site';

export const siteStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Paul Ochieng Levi',
      alternateName: 'Paul Ochieng',
      url: SITE_HOME_URL,
      jobTitle: 'Software Engineer',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kampala',
        addressCountry: 'UG',
      },
      sameAs: SOCIAL_PROFILES,
      knowsAbout: [
        'Software Engineering',
        'React',
        'Next.js',
        'TypeScript',
        'API Development',
        'Applied AI',
        'Python',
        'FastAPI',
        'Django REST Framework',
        'Air Quality Data Platforms',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: 'Paul Ochieng',
      url: SITE_HOME_URL,
      inLanguage: 'en-UG',
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#person` },
    },
  ],
};

export const profilePageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profilepage`,
  url: SITE_HOME_URL,
  name: SITE_TITLE,
  description: SITE_DESCRIPTION,
  inLanguage: 'en-UG',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  mainEntity: { '@id': `${SITE_URL}/#person` },
};

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
    { name: 'Home', url: SITE_HOME_URL },
  ]);
}

export function aboutBreadcrumbs() {
  return buildBreadcrumbJsonLd([
    { name: 'Home', url: SITE_HOME_URL },
    { name: 'About', url: '/about' },
  ]);
}

export function workBreadcrumbs() {
  return buildBreadcrumbJsonLd([
    { name: 'Home', url: SITE_HOME_URL },
    { name: 'Work', url: '/work' },
  ]);
}

export function projectBreadcrumbs(slug: string, title: string) {
  return buildBreadcrumbJsonLd([
    { name: 'Home', url: SITE_HOME_URL },
    { name: 'Work', url: '/work' },
    { name: title, url: `/work/${slug}` },
  ]);
}

export function engineeringBreadcrumbs() {
  return buildBreadcrumbJsonLd([
    { name: 'Home', url: SITE_HOME_URL },
    { name: 'Engineering', url: '/engineering' },
  ]);
}

export function nowBreadcrumbs() {
  return buildBreadcrumbJsonLd([
    { name: 'Home', url: SITE_HOME_URL },
    { name: 'Now', url: '/now' },
  ]);
}

export function contactBreadcrumbs() {
  return buildBreadcrumbJsonLd([
    { name: 'Home', url: SITE_HOME_URL },
    { name: 'Contact', url: '/contact' },
  ]);
}
