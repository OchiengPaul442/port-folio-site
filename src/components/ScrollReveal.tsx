'use client';

import { motion, type Variants } from 'motion/react';
import { type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  once?: boolean;
  scale?: boolean;
}

const directionOffsets = {
  up: { y: 20, x: 0 },
  down: { y: -20, x: 0 },
  left: { x: 20, y: 0 },
  right: { x: -20, y: 0 },
};

/**
 * ScrollReveal: applies the 6 transition animation principles:
 * 1. Fade in/out with opacity (always)
 * 2. Scale to add liveliness (optional, via `scale` prop)
 * 3. Consistent directionality (via `direction` prop)
 * 4. Balanced speed (350ms default, within the 100-500ms ideal range)
 * 5. Prioritize, order, group (via `delay` prop for cascading)
 * 6. Establish spatiality (subtle translate creates depth)
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.35,
  once = true,
  scale = false,
}: ScrollRevealProps) {
  const offset = directionOffsets[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      scale: scale ? 0.97 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
