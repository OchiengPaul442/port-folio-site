'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();
  const [consent, setConsent] = useState<'unknown' | 'granted' | 'denied'>('unknown');

  useEffect(() => {
    const readConsent = () => {
      const value = window.localStorage.getItem('privacy-analytics-consent');
      setConsent(value === 'granted' || value === 'denied' ? value : 'unknown');
    };

    readConsent();
    window.addEventListener('privacy-consent-changed', readConsent);
    return () => window.removeEventListener('privacy-consent-changed', readConsent);
  }, []);

  useEffect(() => {
    if (consent !== 'granted' || !measurementId || typeof window.gtag !== 'function') return;

    window.gtag('event', 'page_view', { page_path: pathname });
  }, [consent, measurementId, pathname]);

  if (!measurementId || consent !== 'granted') return null;

  const safeMeasurementId = JSON.stringify(measurementId);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function(){window.dataLayer.push(arguments);};
          window.gtag('js', new Date());
          window.gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          window.gtag('config', ${safeMeasurementId}, { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
