import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTORS = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

interface FocusTrapOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
  onEscape?: () => void;
}

export function useFocusTrap(
  active: boolean,
  options: FocusTrapOptions,
) {
  const { containerRef, initialFocusRef, returnFocusRef, onEscape } = options;
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    // Capture in a const so TypeScript knows it's non-null inside closures
    const el = container;

    // Save the currently focused element so we can restore it later
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    // Focus the initial element
    const focusTarget =
      initialFocusRef?.current ??
      el.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);

    // Small delay to let the DOM settle for conditionally rendered containers
    const raf = requestAnimationFrame(() => {
      focusTarget?.focus();
    });

    // Capture the return-focus target at setup time so the cleanup closure
    // uses a stable reference (avoids react-hooks/exhaustive-deps warning).
    const returnTarget = returnFocusRef?.current ?? null;

    function getFocusableElements(): HTMLElement[] {
      return Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onEscape?.();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    el.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('keydown', handleKeyDown);

      // Restore focus
      (returnTarget ?? previousFocusRef.current)?.focus();
    };
  }, [active, containerRef, initialFocusRef, returnFocusRef, onEscape]);
}
