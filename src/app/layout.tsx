import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ClickFeedback } from '@/components/ClickFeedback';
import { LanguageSelector } from '@/components/LanguageSelector';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ThemeProvider } from '@/components/ThemeProvider';
import { CustomCursor } from '@/components/CustomCursor';
import { Analytics } from '@/components/Analytics';
import { ConsentBanner } from '@/components/ConsentBanner';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL, SOCIAL_PROFILES } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  category: 'technology',
  title: {
    default: 'Paul Ochieng Levi — Full-Stack Software Engineer',
    template: '%s | Paul Ochieng Levi',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Paul Ochieng Levi',
    'Software Engineer Uganda',
    'full-stack software engineer',
    'React Next.js developer Uganda',
    'backend and frontend engineer',
    'environmental technology',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Paul Ochieng Levi',
    title: 'Paul Ochieng Levi — Full-Stack Software Engineer',
    description: SITE_DESCRIPTION,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paul Ochieng Levi — Full-Stack Software Engineer',
    description: SITE_DESCRIPTION,
    creator: '@OchiengTech',
    images: [{ url: '/twitter-image', width: 1200, height: 630, alt: SITE_TITLE }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-UG': SITE_URL,
    },
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico' }],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  manifest: '/manifest.webmanifest',
  formatDetection: { email: false, address: false, telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="site-shell min-h-full flex flex-col">
        <Analytics />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SmoothScrollProvider>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <ScrollProgress />
            <ClickFeedback />
            <CustomCursor />
            <Navigation />
            <main id="main-content" className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
            <LanguageSelector />
            <ConsentBanner />
          </SmoothScrollProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': `${SITE_URL}/#person`,
                  name: 'Paul Ochieng Levi',
                  alternateName: 'ochiengpaul.com',
                  url: SITE_URL,
                  jobTitle: 'Software Engineer',
                  worksFor: { '@type': 'Organization', name: 'AirQo' },
                  address: { '@type': 'PostalAddress', addressLocality: 'Kampala', addressCountry: 'UG' },
                  sameAs: SOCIAL_PROFILES,
                  image: `${SITE_URL}/brand/logo-transparent-512.png`,
                  knowsAbout: ['Software Engineering', 'Applied AI', 'Environmental Technology', 'TypeScript', 'Python', 'React', 'Next.js'],
                },
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_URL}/#website`,
                  name: 'Paul Ochieng Levi',
                  alternateName: 'ochiengpaul.com',
                  url: SITE_URL,
                  inLanguage: 'en-UG',
                  description: SITE_DESCRIPTION,
                  publisher: { '@id': `${SITE_URL}/#person` },
                },
                {
                  '@type': 'ProfilePage',
                  '@id': `${SITE_URL}/#profilepage`,
                  url: SITE_URL,
                  name: SITE_TITLE,
                  isPartOf: { '@id': `${SITE_URL}/#website` },
                  mainEntity: { '@id': `${SITE_URL}/#person` },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
