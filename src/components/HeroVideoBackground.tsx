'use client';

import { useEffect, useRef } from 'react';

export function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <div className="hero-video-container">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1920&q=80"
      >
        <source
          src="https://videos.pexels.com/video-files/5765440/5765440-sd_640_360_25fps.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-[var(--color-bg-primary)]/75" />
    </div>
  );
}
