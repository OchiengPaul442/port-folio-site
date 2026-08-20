'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

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
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const travel = Math.max(0.05, Math.min(speed, 0.8)) * 50;
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`]);

  const imageStyle = prefersReducedMotion
    ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' as const, backgroundPosition: 'center' as const }
    : { y, backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' as const, backgroundPosition: 'center' as const };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${height} ${className}`}
    >
      <motion.div
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={imageStyle}
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
