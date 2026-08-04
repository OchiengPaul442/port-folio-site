'use client';

import dynamic from 'next/dynamic';

const Analytics = dynamic(
  () => import('@/components/Analytics').then((m) => m.Analytics),
  { ssr: false },
);

const ClickFeedback = dynamic(
  () => import('@/components/ClickFeedback').then((m) => m.ClickFeedback),
  { ssr: false },
);

const CustomCursor = dynamic(
  () => import('@/components/CustomCursor').then((m) => m.CustomCursor),
  { ssr: false },
);

const ScrollProgress = dynamic(
  () => import('@/components/ScrollProgress').then((m) => m.ScrollProgress),
  { ssr: false },
);

const LanguageSelector = dynamic(
  () => import('@/components/LanguageSelector').then((m) => m.LanguageSelector),
  { ssr: false },
);

const ConsentBanner = dynamic(
  () => import('@/components/ConsentBanner').then((m) => m.ConsentBanner),
  { ssr: false },
);

const PortfolioChatWidget = dynamic(
  () => import('@/components/PortfolioChatWidget').then((m) => m.PortfolioChatWidget),
  { ssr: false },
);

export function ClientProviders() {
  return (
    <>
      <Analytics />
      <ScrollProgress />
      <ClickFeedback />
      <CustomCursor />
      <LanguageSelector />
      <ConsentBanner />
      <PortfolioChatWidget />
    </>
  );
}
