'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxSectionProps {
  children?: React.ReactNode;
  imageUrl: string;
  height?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  speed?: number;
  className?: string;
}

export function ParallaxSection({
  children,
  imageUrl,
  height = 'h-72',
  overlay = true,
  overlayOpacity = 0.6,
  speed = 0.3,
  className = '',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${height} ${className}`}
    >
      <motion.div
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{ y, backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-[var(--color-bg-primary)]"
          style={{ opacity: overlayOpacity }}
        />
      )}
      {children && (
        <div className="relative z-10 flex h-full items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
