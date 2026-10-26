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

/**
 * Keep the existing call-site API while rendering content visible in the
 * server response. Content must not depend on JavaScript or an entrance
 * animation to be visible to visitors, crawlers, and assistive technology.
 */
export function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
  return <div className={className}>{children}</div>;
}
