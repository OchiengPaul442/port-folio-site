'use client';

import { FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUp, Bot, Check, ExternalLink, MessageCircle, X } from 'lucide-react';

type Role = 'user' | 'assistant';
type Message = { id: string; role: Role; content: string };
type Source = { title: string; url: string; snippet: string; provider: string };
type Quota = { limit: number; remaining: number; reset_at: string };

type MetaEvent = {
  quota: Quota;
  sources: Source[];
};
type AgentStatus = 'checking' | 'ready' | 'warming' | 'offline';

const SUGGESTIONS = ['What has Paul built?', 'Tell me about his AI work', 'How can we collaborate?'];
const WARMUP_MESSAGES = ['Waking up the assistant...', 'Connecting to the portfolio agent...', 'Preparing your response...'];
const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi, I'm Paul's portfolio assistant. Ask me about his work, skills, or AI projects.",
};

const API_URL = '/api/portfolio-agent';

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

function readableLinkLabel(href: string) {
  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, '');
    const path = url.pathname === '/' ? '' : decodeURIComponent(url.pathname).replace(/\/$/, '');
    return `${host}${path}`;
  } catch {
    return href.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }
}

function formatResetTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'later today';
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function waitForRetry(milliseconds: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(resolve, milliseconds);
    signal.addEventListener('abort', () => {
      window.clearTimeout(timer);
      reject(new DOMException('Request aborted', 'AbortError'));
    }, { once: true });
  });
}

function renderInline(value: string, keyPrefix: string): ReactNode[] {
  const tokenPattern = /(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\[\d+(?:,\s*\d+)*\]|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+)/g;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(value))) {
    if (match.index > cursor) nodes.push(value.slice(cursor, match.index));
    const token = match[0];
    if (token.startsWith('**') || token.startsWith('__')) {
      nodes.push(<strong key={`${keyPrefix}-strong-${match.index}`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`')) {
      nodes.push(<code key={`${keyPrefix}-code-${match.index}`}>{token.slice(1, -1)}</code>);
    } else if (/^\[\d+(?:,\s*\d+)*\]$/.test(token)) {
      nodes.push(<sup className="portfolio-chat-citation" key={`${keyPrefix}-citation-${match.index}`}>{token}</sup>);
    } else {
      const markdownLink = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      const href = (markdownLink?.[2] ?? token).replace(/[.,!?;:]+$/, '');
      if (isSafeSource({ title: '', url: href, snippet: '', provider: '' })) {
        nodes.push(
          <a className="portfolio-chat-inline-link" key={`${keyPrefix}-link-${match.index}`} href={href} target="_blank" rel="noreferrer">
            <span>{markdownLink?.[1] ?? readableLinkLabel(href)}</span>
            <ExternalLink size={11} aria-hidden="true" />
          </a>,
        );
      } else {
        nodes.push(token);
      }
    }
    cursor = match.index + token.length;
  }

  if (cursor < value.length) nodes.push(value.slice(cursor));
  return nodes;
}

function renderAssistantContent(content: string): ReactNode[] {
  const blocks: ReactNode[] = [];
  const lines = content.split(/\r?\n/);
  let listItems: { text: string; ordered: boolean }[] = [];
  let codeLines: string[] | null = null;
  let codeLanguage = '';

  const flushList = () => {
    if (!listItems.length) return;
    const ordered = listItems[0].ordered;
    const List = ordered ? 'ol' : 'ul';
    blocks.push(<List key={`list-${blocks.length}`}>{listItems.map((item, index) => <li key={`item-${index}`}>{renderInline(item.text, `item-${index}`)}</li>)}</List>);
    listItems = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      if (codeLines) {
        blocks.push(<pre key={`code-block-${index}`}><code data-language={codeLanguage || undefined}>{codeLines.join('\n')}</code></pre>);
        codeLines = null;
        codeLanguage = '';
      } else {
        flushList();
        codeLines = [];
        codeLanguage = trimmed.slice(3).trim();
      }
      return;
    }
    if (codeLines) {
      codeLines.push(line);
      return;
    }
    const bullet = trimmed.match(/^[-*+]\s+(.+)$/);
    const numbered = trimmed.match(/^\d+[.)]\s+(.+)$/);
    if (bullet || numbered) {
      const ordered = Boolean(numbered);
      if (listItems.length && listItems[0].ordered !== ordered) flushList();
      listItems.push({ text: (bullet ?? numbered)?.[1] ?? '', ordered });
      return;
    }
    flushList();
    if (/^(?:[-*_]\s*){3,}$/.test(trimmed)) {
      blocks.push(<hr key={`rule-${index}`} />);
      return;
    }
    if (trimmed.startsWith('>')) {
      blocks.push(<blockquote key={`quote-${index}`}>{renderInline(trimmed.replace(/^>\s?/, ''), `quote-${index}`)}</blockquote>);
      return;
    }
    if (!trimmed) {
      blocks.push(<span className="portfolio-chat-rich-break" key={`break-${index}`} aria-hidden="true" />);
      return;
    }
    const heading = trimmed.match(/^#{1,3}\s+(.+)$/);
    if (heading) {
      blocks.push(<h3 key={`heading-${index}`}>{renderInline(heading[1], `heading-${index}`)}</h3>);
      return;
    }
    blocks.push(<p key={`paragraph-${index}`}>{renderInline(trimmed, `paragraph-${index}`)}</p>);
  });

  flushList();
  const remainingCode = codeLines as string[] | null;
  if (remainingCode !== null) blocks.push(<pre key="code-block-final"><code data-language={codeLanguage || undefined}>{remainingCode.join('\n')}</code></pre>);
  return blocks;
}

export function PortfolioChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [sources, setSources] = useState<Source[]>([]);
  const [quota, setQuota] = useState<Quota | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryText, setRetryText] = useState<string | null>(null);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>('checking');
  const [warmupIndex, setWarmupIndex] = useState(0);
  const abortRef = useRef<AbortController | null>(null);
  const feedRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const revealQueueRef = useRef('');
  const revealedTextRef = useRef('');
  const revealTimerRef = useRef<number | null>(null);
  const readinessTimerRef = useRef<number | null>(null);

  const history = useMemo(
    () => messages.slice(1).filter((message) => message.content.trim()).slice(-12).map(({ role, content }) => ({ role, content })),
    [messages],
  );

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    setAgentStatus('checking');
    const checkReadiness = async () => {
      try {
        const response = await fetch(`${API_URL}/health/ready`, { credentials: 'include', signal: controller.signal, cache: 'no-store' });
        if (response.ok) {
          setAgentStatus('ready');
          return;
        }
        if (response.status === 503) {
          setAgentStatus('warming');
          const retryAfter = Number(response.headers.get('retry-after'));
          readinessTimerRef.current = window.setTimeout(checkReadiness, Math.min(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 3000, 8000));
          return;
        }
        setAgentStatus('offline');
      } catch {
        if (!controller.signal.aborted) setAgentStatus('offline');
      }
    };
    checkReadiness();
    fetch(`${API_URL}/chat/quota`, { credentials: 'include', signal: controller.signal, cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error('Quota unavailable');
        return (await response.json()) as Quota;
      })
      .then(setQuota)
      .catch(() => undefined);
    window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => {
      controller.abort();
      if (readinessTimerRef.current) window.clearTimeout(readinessTimerRef.current);
    };
  }, [open]);

  useEffect(() => {
    if (agentStatus !== 'warming') return;
    const timer = window.setInterval(() => setWarmupIndex((current) => (current + 1) % WARMUP_MESSAGES.length), 1800);
    return () => window.clearInterval(timer);
  }, [agentStatus]);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') requestClose();
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, loading]);

  useEffect(() => () => {
    abortRef.current?.abort();
    if (revealTimerRef.current) window.clearInterval(revealTimerRef.current);
    if (readinessTimerRef.current) window.clearTimeout(readinessTimerRef.current);
  }, []);

  function updateAssistant(id: string, content: string) {
    setMessages((current) => current.map((message) => (message.id === id ? { ...message, content } : message)));
  }

  function closeChat() {
    setShowCloseConfirm(false);
    setOpen(false);
    setMessages([INITIAL_MESSAGE]);
    setSources([]);
    setError(null);
    setRetryText(null);
    setInput('');
  }

  function requestClose() {
    if (loading) return;
    if (messages.length > 1) {
      setShowCloseConfirm(true);
      return;
    }
    closeChat();
  }

  function queueReveal(id: string, chunk: string) {
    revealQueueRef.current += chunk;
    if (revealTimerRef.current) return;
    revealTimerRef.current = window.setInterval(() => {
      if (!revealQueueRef.current) {
        if (revealTimerRef.current) window.clearInterval(revealTimerRef.current);
        revealTimerRef.current = null;
        return;
      }
      const step = revealQueueRef.current.length > 140 ? 3 : 1;
      revealedTextRef.current += revealQueueRef.current.slice(0, step);
      revealQueueRef.current = revealQueueRef.current.slice(step);
      updateAssistant(id, revealedTextRef.current);
    }, 15);
  }

  function waitForReveal() {
    return new Promise<void>((resolve) => {
      const check = () => {
        if (!revealQueueRef.current && !revealTimerRef.current) resolve();
        else window.setTimeout(check, 16);
      };
      check();
    });
  }

  function handleInputChange(value: string) {
    setInput(value);
    const textarea = inputRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 96)}px`;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading || quota?.remaining === 0) return;

    const assistantId = newId();
    revealQueueRef.current = '';
    revealedTextRef.current = '';
    if (revealTimerRef.current) window.clearInterval(revealTimerRef.current);
    revealTimerRef.current = null;
    setMessages((current) => [...current, { id: newId(), role: 'user', content: text }, { id: assistantId, role: 'assistant', content: '' }]);
    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
    setSources([]);
    setError(null);
    setRetryText(null);
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      let response: Response | undefined;
      for (let attempt = 0; attempt < 4; attempt += 1) {
        response = await fetch(`${API_URL}/chat/stream`, {
          method: 'POST',
          credentials: 'include',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, history, search: 'auto' }),
        });
        if (response.status !== 503) break;
        setAgentStatus('warming');
        if (attempt < 3) {
          const retryAfter = Number(response.headers.get('retry-after'));
          const delay = Math.min(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 3000, 8000);
          await waitForRetry(delay, controller.signal);
        }
      }

      if (!response) throw new Error('The assistant did not return a response.');
      if (response.status === 503) throw new Error('The assistant is still waking up. Please try again in a moment.');
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        if (payload?.error?.quota) setQuota(payload.error.quota as Quota);
        throw new Error(payload?.error?.message ?? (response.status === 429 ? 'Today’s chat limit has been reached. Please try again tomorrow.' : 'The assistant is temporarily unavailable.'));
      }
      setAgentStatus('ready');
      if (!response.body) throw new Error('Streaming is not supported by this browser.');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
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
            queueReveal(assistantId, (JSON.parse(parsed.data) as { text: string }).text);
          }
          if (parsed.event === 'error') throw new Error('The response stream ended unexpectedly.');
        }
        if (done) break;
      }
      await waitForReveal();
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
      {open && <button className="portfolio-chat-scrim" aria-label="Close chat" onClick={requestClose} />}
      {open ? (
        <section id="portfolio-chat-panel" className="portfolio-chat-panel" aria-label="Paul’s portfolio assistant" role="dialog" aria-modal="false">
          <header className="portfolio-chat-header">
            <div className="portfolio-chat-heading">
              <span className="portfolio-chat-avatar" aria-hidden="true"><Bot size={18} strokeWidth={1.8} /></span>
              <div><h2>Ask the assistant</h2></div>
            </div>
            <button ref={closeRef} className="portfolio-chat-icon" onClick={requestClose} aria-label="Close chat" disabled={loading}><X size={18} /></button>
          </header>

          <div className="portfolio-chat-feed" ref={feedRef} role="log" aria-live="polite" aria-relevant="additions" aria-label="Conversation">
            <div className={`portfolio-chat-context portfolio-chat-context-${agentStatus}`} role="status"><span className="portfolio-chat-status-dot" /> {agentStatus === 'warming' ? WARMUP_MESSAGES[warmupIndex] : agentStatus === 'checking' ? 'Checking the assistant...' : agentStatus === 'offline' ? 'Assistant temporarily unavailable' : quota?.remaining === 0 ? 'Daily chat limit reached' : "Answers from Paul's public work"}</div>
            {messages.map((message) => (
              <article key={message.id} className={`portfolio-chat-message portfolio-chat-message-${message.role}`}>
                {message.role === 'assistant' && <span className="portfolio-chat-message-avatar" aria-hidden="true"><Bot size={13} /></span>}
                <div className="portfolio-chat-message-body">
                  <span className="portfolio-chat-message-label">{message.role === 'assistant' ? 'Assistant' : 'You'}</span>
                  {message.content ? message.role === 'assistant' ? <div className="portfolio-chat-rich-text">{renderAssistantContent(message.content)}{loading && message.id === messages[messages.length - 1]?.id && <span className="portfolio-chat-caret" aria-hidden="true" />}</div> : <p>{message.content}</p> : <p><span className="portfolio-chat-skeleton" role="status" aria-label="Assistant is preparing a response"><i /><i /><i /></span></p>}
                </div>
              </article>
            ))}
            {messages.length === 1 && <div className="portfolio-chat-suggestions" aria-label="Suggested questions">{SUGGESTIONS.map((suggestion) => <button key={suggestion} type="button" onClick={() => { setInput(suggestion); inputRef.current?.focus(); }}>{suggestion}</button>)}</div>}
            {sources.length > 0 && <aside className="portfolio-chat-sources"><p>Referenced links</p>{sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.title}<ExternalLink size={12} /></a>)}</aside>}
          </div>

          <form className="portfolio-chat-form" onSubmit={submit}>
            {error && <div className="portfolio-chat-error" role="alert"><span>{error}</span>{retryText && <button type="button" onClick={() => { setInput(retryText); setError(null); inputRef.current?.focus(); }}>Try again</button>}</div>}
            {quota?.remaining === 0 && <div className="portfolio-chat-quota-message" role="status">You have used all {quota.limit} questions for today. Your quota resets at {formatResetTime(quota.reset_at)}.</div>}
            <label htmlFor="portfolio-chat-input">Message the assistant</label>
            <div className="portfolio-chat-input-wrap">
              <textarea ref={inputRef} id="portfolio-chat-input" value={input} onChange={(event) => handleInputChange(event.target.value)} maxLength={2000} rows={1} disabled={loading || quota?.remaining === 0} placeholder="Ask about a project, skill, or experience…" onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} />
              <button className="portfolio-chat-send" type="submit" aria-label="Send message" disabled={loading || !input.trim() || quota?.remaining === 0}>{loading ? <span className="portfolio-chat-spinner" /> : <ArrowUp size={17} />}</button>
            </div>
            <div className="portfolio-chat-disclaimer">Temporary chat. Closing this panel clears the conversation. Please avoid sharing sensitive information. <a href="/privacy">Privacy details</a></div>
            <div className="portfolio-chat-form-meta"><span>{quota ? `${quota.remaining} of ${quota.limit} questions left today` : '15 questions per day'}</span><span><Check size={12} /> Enter to send</span></div>
          </form>
        </section>
      ) : (
        <button ref={closeRef} className="portfolio-chat-launcher" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="portfolio-chat-panel"><span className="portfolio-chat-launcher-icon"><MessageCircle size={19} /></span><span>Ask Paul's assistant</span><span className="portfolio-chat-launcher-pulse" aria-hidden="true" /></button>
      )}
      {showCloseConfirm && <div className="portfolio-chat-confirm-backdrop"><section className="portfolio-chat-confirm" role="alertdialog" aria-modal="true" aria-labelledby="portfolio-chat-confirm-title" aria-describedby="portfolio-chat-confirm-description"><div className="portfolio-chat-confirm-icon"><X size={16} /></div><h2 id="portfolio-chat-confirm-title">Close this chat?</h2><p id="portfolio-chat-confirm-description">This conversation is temporary and will be cleared when you close the chat. You will not be able to recover it.</p><div className="portfolio-chat-confirm-actions"><button type="button" onClick={() => setShowCloseConfirm(false)}>Keep chatting</button><button type="button" onClick={closeChat}>Close chat</button></div></section></div>}
    </div>
  );
}
