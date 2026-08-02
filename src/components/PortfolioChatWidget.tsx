'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUp, Bot, Check, ExternalLink, MessageCircle, X } from 'lucide-react';

type Role = 'user' | 'assistant';
type Message = { id: string; role: Role; content: string };
type Source = { title: string; url: string; snippet: string; provider: string };
type Quota = { limit: number; remaining: number; reset_at: string };

type MetaEvent = {
  quota: Quota;
  sources: Source[];
};

const SUGGESTIONS = ['What has Paul built?', 'Tell me about his AI work', 'How can we collaborate?'];

const configuredApiUrl = (process.env.NEXT_PUBLIC_PORTFOLIO_AGENT_URL ?? 'https://agent.ochiengpaul.com').replace(/\/$/, '');
const API_URL = configuredApiUrl.startsWith('https://') || (process.env.NODE_ENV !== 'production' && configuredApiUrl.startsWith('http://localhost'))
  ? configuredApiUrl
  : 'https://agent.ochiengpaul.com';

function newId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

function parseSseBlock(block: string) {
  let event = 'message';
  const data: string[] = [];

  for (const line of block.split('\n')) {
    if (line.startsWith('event:')) event = line.slice(6).trim();
    if (line.startsWith('data:')) data.push(line.slice(5).trimStart());
  }

  return data.length ? { event, data: data.join('\n') } : null;
}

function isSafeSource(source: Source) {
  try {
    const url = new URL(source.url);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export function PortfolioChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: newId(),
      role: 'assistant',
      content: "Hi, I’m Paul’s portfolio assistant. Ask me about his work, skills, or AI projects.",
    },
  ]);
  const [sources, setSources] = useState<Source[]>([]);
  const [quota, setQuota] = useState<Quota | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryText, setRetryText] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const feedRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const history = useMemo(
    () => messages.slice(1).filter((message) => message.content.trim()).slice(-12).map(({ role, content }) => ({ role, content })),
    [messages],
  );

  useEffect(() => {
    if (!open) return;
    fetch(`${API_URL}/api/v1/chat/quota`, { credentials: 'include' })
      .then(async (response) => {
        if (!response.ok) throw new Error('Quota unavailable');
        return (await response.json()) as Quota;
      })
      .then(setQuota)
      .catch(() => undefined);
    window.setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && !loading) {
        setOpen(false);
        closeRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, loading]);

  useEffect(() => () => abortRef.current?.abort(), []);

  function updateAssistant(id: string, content: string) {
    setMessages((current) => current.map((message) => (message.id === id ? { ...message, content } : message)));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading || quota?.remaining === 0) return;

    const assistantId = newId();
    setMessages((current) => [...current, { id: newId(), role: 'user', content: text }, { id: assistantId, role: 'assistant', content: '' }]);
    setInput('');
    setSources([]);
    setError(null);
    setRetryText(null);
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(`${API_URL}/api/v1/chat/stream`, {
        method: 'POST',
        credentials: 'include',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history, search: 'auto' }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        if (payload?.error?.quota) setQuota(payload.error.quota as Quota);
        throw new Error(payload?.error?.message ?? (response.status === 429 ? 'Today’s chat limit has been reached. Please try again tomorrow.' : 'The assistant is temporarily unavailable.'));
      }
      if (!response.body) throw new Error('Streaming is not supported by this browser.');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let answer = '';

      while (true) {
        const { done, value } = await reader.read();
        buffer += decoder.decode(value, { stream: !done }).replace(/\r\n/g, '\n');
        const blocks = buffer.split('\n\n');
        buffer = blocks.pop() ?? '';

        for (const block of blocks) {
          const parsed = parseSseBlock(block);
          if (!parsed) continue;
          if (parsed.event === 'meta') {
            const meta = JSON.parse(parsed.data) as MetaEvent;
            setQuota(meta.quota);
            setSources((meta.sources ?? []).filter(isSafeSource));
          }
          if (parsed.event === 'token') {
            answer += (JSON.parse(parsed.data) as { text: string }).text;
            updateAssistant(assistantId, answer);
          }
          if (parsed.event === 'error') throw new Error('The response stream ended unexpectedly.');
        }
        if (done) break;
      }
    } catch (caught) {
      if (controller.signal.aborted) return;
      const caughtMessage = caught instanceof Error ? caught.message : '';
      const message = caughtMessage.includes('NetworkError') || caughtMessage.includes('Failed to fetch')
        ? 'I could not connect to the assistant. Check your connection and try again.'
        : caughtMessage || 'Something went wrong. Please try again.';
      setError(message);
      setRetryText(text);
      setMessages((current) => current.map((item) => item.id === assistantId && !item.content ? { ...item, content: 'I couldn’t complete that response. Please try again.' } : item));
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }

  return (
    <div className="portfolio-chat-root">
      {open && <button className="portfolio-chat-scrim" aria-label="Close chat" onClick={() => !loading && setOpen(false)} />}
      {open ? (
        <section id="portfolio-chat-panel" className="portfolio-chat-panel" aria-label="Paul’s portfolio assistant" role="dialog" aria-modal="false">
          <header className="portfolio-chat-header">
            <div className="portfolio-chat-heading">
              <span className="portfolio-chat-avatar" aria-hidden="true"><Bot size={18} strokeWidth={1.8} /></span>
              <div><p className="portfolio-chat-eyebrow">Paul’s portfolio</p><h2>Ask the assistant</h2></div>
            </div>
            <button ref={closeRef} className="portfolio-chat-icon" onClick={() => !loading && setOpen(false)} aria-label="Close chat" disabled={loading}><X size={18} /></button>
          </header>

          <div className="portfolio-chat-feed" ref={feedRef} aria-live="polite" aria-label="Conversation">
            <div className="portfolio-chat-context"><span className="portfolio-chat-status-dot" /> Answers from Paul's public work</div>
            {messages.map((message) => (
              <article key={message.id} className={`portfolio-chat-message portfolio-chat-message-${message.role}`}>
                {message.role === 'assistant' && <span className="portfolio-chat-message-avatar" aria-hidden="true"><Bot size={13} /></span>}
                <div className="portfolio-chat-message-body">
                  <span className="portfolio-chat-message-label">{message.role === 'assistant' ? 'Assistant' : 'You'}</span>
                  <p>{message.content || <span className="portfolio-chat-skeleton" role="status" aria-label="Assistant is preparing a response"><i /><i /><i /></span>}</p>
                </div>
              </article>
            ))}
            {messages.length === 1 && <div className="portfolio-chat-suggestions" aria-label="Suggested questions">{SUGGESTIONS.map((suggestion) => <button key={suggestion} type="button" onClick={() => { setInput(suggestion); inputRef.current?.focus(); }}>{suggestion}</button>)}</div>}
            {sources.length > 0 && <aside className="portfolio-chat-sources"><p>Referenced links</p>{sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.title}<ExternalLink size={12} /></a>)}</aside>}
          </div>

          <form className="portfolio-chat-form" onSubmit={submit}>
            {error && <div className="portfolio-chat-error" role="alert"><span>{error}</span>{retryText && <button type="button" onClick={() => { setInput(retryText); setError(null); inputRef.current?.focus(); }}>Try again</button>}</div>}
            <label htmlFor="portfolio-chat-input">Message the assistant</label>
            <div className="portfolio-chat-input-wrap">
              <textarea ref={inputRef} id="portfolio-chat-input" value={input} onChange={(event) => setInput(event.target.value)} maxLength={2000} rows={1} disabled={loading || quota?.remaining === 0} placeholder="Ask about a project, skill, or experience…" onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} />
              <button className="portfolio-chat-send" type="submit" aria-label="Send message" disabled={loading || !input.trim() || quota?.remaining === 0}>{loading ? <span className="portfolio-chat-spinner" /> : <ArrowUp size={17} />}</button>
            </div>
            <div className="portfolio-chat-form-meta"><span>{quota ? `${quota.remaining} of ${quota.limit} questions left today` : '15 questions per day'}</span><span><Check size={12} /> Enter to send</span></div>
          </form>
        </section>
      ) : (
        <button ref={closeRef} className="portfolio-chat-launcher" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="portfolio-chat-panel"><span className="portfolio-chat-launcher-icon"><MessageCircle size={19} /></span><span>Ask Paul’s assistant</span><span className="portfolio-chat-launcher-pulse" aria-hidden="true" /></button>
      )}
    </div>
  );
}
