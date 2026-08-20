'use client';

import { useState, useCallback } from 'react';
import { Check, Copy } from 'lucide-react';

export default function ChatCodeBlock({ language, children }: { language?: string; children: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(children);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = children;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [children]);

  return (
    <div className="portfolio-chat-code-block">
      <div className="portfolio-chat-code-header">
        <span className="portfolio-chat-code-lang">{language || 'code'}</span>
        <button
          className={`portfolio-chat-code-copy${copied ? ' portfolio-chat-code-copy-active' : ''}`}
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre><code>{children}</code></pre>
    </div>
  );
}
