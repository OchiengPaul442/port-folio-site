'use client';

import { useEffect, useRef } from 'react';

const POINTER_TARGET_SELECTOR = [
  'a[href]:not([aria-disabled="true"])',
  'button:not(:disabled):not([aria-disabled="true"])',
  '[role="button"]:not([aria-disabled="true"])',
  '[role="link"]:not([aria-disabled="true"])',
  'input[type="button"]:not(:disabled)',
  'input[type="submit"]:not(:disabled)',
  'input[type="checkbox"]:not(:disabled)',
  'input[type="radio"]:not(:disabled)',
  'select:not(:disabled)',
  'summary',
  'label[for]',
  '[data-cursor="pointer"]',
].join(',');

const EDITABLE_TARGET_SELECTOR = [
  'textarea:not(:disabled)',
  'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not(:disabled)',
  '[contenteditable="true"]',
  '[role="textbox"]',
].join(',');

const CURSOR_STATE_CLASSES = [
  'has-custom-cursor',
  'cursor-is-pointer',
  'cursor-uses-native',
  'cursor-is-clicking',
] as const;

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supportsCustomCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!supportsCustomCursor || prefersReducedMotion) return;

    const root = document.documentElement;

    const handleMouseMove = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const isEditable = Boolean(target?.closest(EDITABLE_TARGET_SELECTOR));
      const isPointerTarget = !isEditable && Boolean(target?.closest(POINTER_TARGET_SELECTOR));

      const cursor = cursorRef.current;
      if (cursor) {
        const pointerOffsetX = isPointerTarget ? 8 : 2;
        const pointerOffsetY = isPointerTarget ? 2 : 1.3;
        cursor.style.transform = `translate3d(${event.clientX - pointerOffsetX}px, ${event.clientY - pointerOffsetY}px, 0)`;
        cursor.style.opacity = '1';
      }

      root.classList.toggle('cursor-uses-native', isEditable);
      root.classList.toggle('cursor-is-pointer', isPointerTarget);
    };

    const hideCursor = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };

    const handleMouseDown = () => root.classList.add('cursor-is-clicking');
    const handleMouseUp = () => root.classList.remove('cursor-is-clicking');

    root.classList.add('has-custom-cursor');
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseleave', hideCursor);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('blur', hideCursor);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', hideCursor);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('blur', hideCursor);
      root.classList.remove(...CURSOR_STATE_CLASSES);
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor-arrow" aria-hidden="true">
      <svg className="cursor-arrow-icon" viewBox="0 0 28 36" focusable="false">
        <path d="M2 1.5v28l7-6.6 5.8 11.3 5.5-2.8-5.8-11.1 10-.2z" />
      </svg>
      <svg className="cursor-hand-icon" viewBox="0 0 32 40" focusable="false">
        <path d="M10 20V5a2.5 2.5 0 0 1 5 0v11a2.3 2.3 0 0 1 4.6 0v2a2.3 2.3 0 0 1 4.6 0v2a2.3 2.3 0 0 1 4.6 0v7c0 6.4-4.2 10.5-10.6 10.5h-1.7c-3.2 0-6.1-1.6-7.9-4.3l-4.3-6.5a2.4 2.4 0 0 1 3.8-2.9l1.9 1.8V20Z" />
      </svg>
    </div>
  );
}
