'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from 'next-themes';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const { theme } = useTheme();

  const createSparkle = useCallback((x: number, y: number) => {
    const colors = ['var(--color-accent)', '#f59e0b', '#d97706', '#b45309'];
    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'cursor-sparkle';
      const angle = (i * 60) * (Math.PI / 180);
      const distance = 20 + Math.random() * 20;
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
      sparkle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
      sparkle.style.background = colors[i % colors.length];
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 500);
    }
  }, []);

  const createConfetti = useCallback((x: number, y: number) => {
    const colors = ['#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f'];
    for (let i = 0; i < 20; i++) {
      const piece = document.createElement('div');
      piece.className = 'cursor-confetti';
      piece.style.left = `${x}px`;
      piece.style.top = `${y}px`;
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.setProperty('--tx', `${(Math.random() - 0.5) * 300}px`);
      piece.style.setProperty('--ty', `${Math.random() * -250 - 50}px`);
      piece.style.setProperty('--r', `${Math.random() * 720}deg`);
      piece.style.width = `${4 + Math.random() * 6}px`;
      piece.style.height = `${4 + Math.random() * 6}px`;
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 1000);
    }
  }, []);

  const showMessage = useCallback((text: string) => {
    const msg = document.createElement('div');
    msg.className = 'cursor-easter-egg-msg';
    msg.textContent = text;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  }, []);

  // Konami code
  const konamiRef = useRef<number[]>([]);
  const konamiSequence = [
    38, 38, 40, 40, 37, 39, 37, 39, 66, 65, // ↑↑↓↓←→←→BA
  ];

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => {
      if (ringRef.current) ringRef.current.classList.add('cursor-ring--click');
    };

    const handleMouseUp = () => {
      if (ringRef.current) ringRef.current.classList.remove('cursor-ring--click');
    };

    const handleClick = (e: MouseEvent) => {
      createSparkle(e.clientX, e.clientY);
    };

    const handleDoubleClick = (e: MouseEvent) => {
      createConfetti(e.clientX, e.clientY);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      konamiRef.current.push(e.keyCode);
      if (konamiRef.current.length > 10) {
        konamiRef.current.shift();
      }
      if (konamiRef.current.join(',') === konamiSequence.join(',')) {
        // Konami code activated!
        for (let i = 0; i < 50; i++) {
          setTimeout(() => {
            const piece = document.createElement('div');
            piece.className = 'cursor-confetti';
            piece.style.left = `${Math.random() * window.innerWidth}px`;
            piece.style.top = '-10px';
            piece.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 60%)`;
            piece.style.setProperty('--tx', `${(Math.random() - 0.5) * 400}px`);
            piece.style.setProperty('--ty', `${window.innerHeight + 50}px`);
            piece.style.setProperty('--r', `${Math.random() * 1080}deg`);
            piece.style.width = '8px';
            piece.style.height = '8px';
            document.body.appendChild(piece);
            setTimeout(() => piece.remove(), 2000);
          }, i * 30);
        }
        showMessage('↑↑↓↓←→←→BA');
        konamiRef.current = [];
      }
    };

    // Animate cursor
    let animId: number;
    const animate = () => {
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.12;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseRef.current.x}px, ${mouseRef.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('click', handleClick);
    document.addEventListener('dblclick', handleDoubleClick);
    document.addEventListener('keydown', handleKeyDown);
    animId = requestAnimationFrame(animate);

    // Hide default cursor
    document.documentElement.classList.add('has-custom-cursor');

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('dblclick', handleDoubleClick);
      document.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animId);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [createSparkle, createConfetti, showMessage]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
