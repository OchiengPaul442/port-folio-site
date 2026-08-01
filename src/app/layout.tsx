import type { Metadata } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ClickFeedback } from '@/components/ClickFeedback';
import { LanguageSelector } from '@/components/LanguageSelector';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ThemeProvider } from '@/components/ThemeProvider';
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
  metadataBase: new URL('https://paul.dev'),
  applicationName: 'Paul Ochieng Levi',
  category: 'technology',
  title: {
    default: 'Paul Ochieng Levi — Full-Stack Software Engineer',
    template: '%s | Paul Ochieng Levi',
  },
  description:
    'Full-stack software engineer in Kampala, Uganda building reliable web products, APIs, developer tools, and data platforms for real-world users.',
  keywords: [
    'Paul Ochieng Levi',
    'Software Engineer Uganda',
    'full-stack software engineer',
    'React Next.js developer Uganda',
    'backend and frontend engineer',
    'environmental technology',
  ],
  authors: [{ name: 'Paul Ochieng Levi' }],
  creator: 'Paul Ochieng Levi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://paul.dev',
    siteName: 'Paul Ochieng Levi',
    title: 'Paul Ochieng Levi — Full-Stack Software Engineer',
    description:
      'Full-stack software engineer building reliable web products, APIs, developer tools, and data platforms.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paul Ochieng Levi — Full-Stack Software Engineer',
    description:
      'Full-stack software engineer building reliable web products, APIs, developer tools, and data platforms.',
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
    languages: {
      'en-UG': 'https://paul.dev',
    },
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
      suppressHydrationWarning
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="site-shell min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SmoothScrollProvider>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <ScrollProgress />
            <ClickFeedback />
            <Navigation />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <LanguageSelector />
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
                  name: 'Paul Ochieng Levi',
                  url: 'https://paul.dev',
                  jobTitle: 'Software Engineer',
                  worksFor: { '@type': 'Organization', name: 'AirQo' },
                  address: { '@type': 'PostalAddress', addressLocality: 'Kampala', addressCountry: 'UG' },
                  sameAs: ['https://github.com/OchiengPaul442', 'https://twitter.com/OchiengTech'],
                  knowsAbout: ['Software Engineering', 'Applied AI', 'Environmental Technology', 'TypeScript', 'Python', 'React', 'Next.js'],
                },
                {
                  '@type': 'WebSite',
                  name: 'Paul Ochieng Levi',
                  url: 'https://paul.dev',
                  inLanguage: 'en-UG',
                  description: 'Portfolio of Paul Ochieng Levi, a full-stack software engineer in Kampala, Uganda.',
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
