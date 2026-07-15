'use client';

import { useEffect, useRef } from 'react';

interface GoogleTranslateElement {
  new (options: Record<string, unknown>, element: string): void;
}

declare global {
  interface Window {
    google?: {
      translate?: GoogleTranslateElement & {
        TranslateElement?: GoogleTranslateElement;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export function LanguageSelector() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    function initWidget() {
      const TranslateClass = window.google?.translate?.TranslateElement;
      if (TranslateClass && widgetRef.current && !widgetRef.current.hasChildNodes()) {
        new TranslateClass(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,lg,sw,fr,es',
            layout: 'SIMPLE',
            autoDisplay: false,
          },
          'google-translate-widget'
        );
      }
    }

    if (scriptLoaded.current) {
      initWidget();
      return;
    }

    if (document.getElementById('google-translate-script')) {
      scriptLoaded.current = true;
      initWidget();
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onload = () => {
      scriptLoaded.current = true;
      initWidget();
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="language-control" data-notranslate="true">
      <div id="google-translate-widget" ref={widgetRef} />
    </div>
  );
}
