'use client';

import { useState } from 'react';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'lg', label: 'Luganda', flag: '🇺🇬' },
  { code: 'sw', label: 'Swahili', flag: '🌍' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

export function LanguageSelector() {
  const [language, setLanguage] = useState('en');

  function handleLanguageChange(target: string) {
    setLanguage(target);
    if (target === 'en') return;

    const translatedUrl = new URL('https://translate.google.com/translate');
    translatedUrl.searchParams.set('sl', 'en');
    translatedUrl.searchParams.set('tl', target);
    translatedUrl.searchParams.set('u', window.location.href);
    window.location.assign(translatedUrl.toString());
  }

  return (
    <div className="language-control" data-no-translate>
      <label className="sr-only" htmlFor="site-language">Translate this page</label>
      <select id="site-language" value={language} onChange={(event) => handleLanguageChange(event.target.value)}>
        {languages.map((item) => <option value={item.code} key={item.code}>{item.flag} {item.label}</option>)}
      </select>
    </div>
  );
}
