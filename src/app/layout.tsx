import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ClientProviders } from '@/components/ClientProviders';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteStructuredData } from '@/lib/seo';
import { SITE_DESCRIPTION, SITE_HOME_URL, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site';
import './globals.css';
import '@/components/portfolio-chat.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  category: 'technology',
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME, url: SITE_HOME_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_UG',
    url: SITE_HOME_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  icons: {
    icon: [
      { url: '/brand/logo-white-background-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/brand/logo-white-background-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
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
      id="top"
      lang="en-UG"
      suppressHydrationWarning
      className="h-full antialiased overflow-x-hidden"
    >
      <body className="site-shell min-h-full flex flex-col overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SmoothScrollProvider>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <ClientProviders />
            <Navigation />
            <main id="main-content" className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
        <JsonLd data={siteStructuredData} />
      </body>
    </html>
  );
}
