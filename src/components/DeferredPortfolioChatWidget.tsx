'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

function ChatLoadingState() {
  return (
    <div className="portfolio-chat-root">
      <div className="portfolio-chat-launcher" role="status" aria-live="polite">
        <span className="portfolio-chat-launcher-icon" aria-hidden="true">
          <MessageCircle size={19} />
        </span>
        <span>Opening assistant…</span>
      </div>
    </div>
  );
}

const PortfolioChatWidget = dynamic(
  () => import('@/components/PortfolioChatWidget').then((module) => module.PortfolioChatWidget),
  { ssr: false, loading: ChatLoadingState },
);

export function DeferredPortfolioChatWidget() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio-chat-state');
      if (!saved) return;

      const state = JSON.parse(saved) as { messages?: unknown };
      if (Array.isArray(state.messages) && state.messages.length > 1) {
        const frame = window.requestAnimationFrame(() => setLoaded(true));
        return () => window.cancelAnimationFrame(frame);
      }
    } catch {
      // Ignore invalid or unavailable local chat state.
    }
  }, []);

  if (loaded) return <PortfolioChatWidget initialOpen />;

  return (
    <div className="portfolio-chat-root">
      <button
        className="portfolio-chat-launcher"
        type="button"
        onClick={() => setLoaded(true)}
        aria-expanded={false}
        aria-controls="portfolio-chat-panel"
      >
        <span className="portfolio-chat-launcher-icon" aria-hidden="true">
          <MessageCircle size={19} />
        </span>
        <span>Ask Paul&apos;s assistant</span>
        <span className="portfolio-chat-launcher-pulse" aria-hidden="true" />
      </button>
    </div>
  );
}
