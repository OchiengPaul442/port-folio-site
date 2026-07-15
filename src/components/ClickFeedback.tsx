'use client';

import { useEffect } from 'react';

export function ClickFeedback() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const showFeedback = (event: PointerEvent) => {
      const spark = document.createElement('span');
      spark.className = 'click-spark';
      spark.style.left = `${event.clientX}px`;
      spark.style.top = `${event.clientY}px`;
      document.body.appendChild(spark);
      spark.addEventListener('animationend', () => spark.remove(), { once: true });
    };

    document.addEventListener('pointerdown', showFeedback, { passive: true });
    return () => document.removeEventListener('pointerdown', showFeedback);
  }, []);

  return null;
}
