import type { Metadata } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import './globals.css';

const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Paul Ochieng Levi — Software Engineer, Uganda',
    template: '%s | Paul Ochieng Levi',
  },
  description:
    'Software engineer in Kampala, Uganda building AI-powered tools, environmental-data platforms, and product infrastructure. Focus on low-bandwidth performance, multi-language support, and infrastructure for African markets.',
  keywords: [
    'Paul Ochieng Levi',
    'Software Engineer Uganda',
    'air quality software engineer',
    'React Next.js developer Uganda',
    'AI agents',
    'environmental technology',
  ],
  authors: [{ name: 'Paul Ochieng Levi' }],
  creator: 'Paul Ochieng Levi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://paul.dev',
    siteName: 'Paul Ochieng Levi',
    title: 'Paul Ochieng Levi — Software Engineer, Uganda',
    description:
      'Software engineer in Kampala, Uganda building AI-powered tools, environmental-data platforms, and product infrastructure.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paul Ochieng Levi — Software Engineer, Uganda',
    description:
      'Software engineer in Kampala, Uganda building AI-powered tools, environmental-data platforms, and product infrastructure.',
    creator: '@OchiengTech',
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
    canonical: 'https://paul.dev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Paul Ochieng Levi',
              url: 'https://paul.dev',
              jobTitle: 'Software Engineer',
              worksFor: {
                '@type': 'Organization',
                name: 'AirQo',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Kampala',
                addressCountry: 'UG',
              },
              sameAs: [
                'https://github.com/OchiengPaul442',
                'https://twitter.com/OchiengTech',
              ],
              knowsAbout: [
                'Software Engineering',
                'AI Agents',
                'Environmental Technology',
                'TypeScript',
                'Python',
                'React',
                'Next.js',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
