'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import GlassCard from '@/components/GlassCard';

type Message = {
  _id: string;
  moonId: string;
  username?: string;
  body: string;
  createdAt: string;
};

export default function ChatPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function load() {
    const res = await fetch('/api/chat');
    const data = await res.json();
    setMessages(data.messages || []);
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 4000); // simple polling — see README for real-time options
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    setError(null);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: draft }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Message failed to send.');
      return;
    }

    setDraft('');
    load();
  }

  return (
    <div className="space-y-4 flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)]">
      <div>
        <h1 className="font-display text-3xl">Chat</h1>
        <p className="text-text-lo mt-1 text-sm">#general</p>
      </div>

      <GlassCard hover={false} className="flex-1 flex flex-col !p-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {messages.map((m) => (
            <div key={m._id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-surface2 shrink-0 flex items-center justify-center font-display text-xs text-moonviolet-light">
                {(m.username || m.moonId)[0]?.toUpperCase()}
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium">{m.username || m.moonId}</span>
                  <span className="text-[11px] text-text-lo font-mono">
                    {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm text-text-hi/90">{m.body}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSend} className="border-t border-border p-3 flex gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={session ? 'Message #general…' : 'Sign in to chat'}
            maxLength={1000}
            className="flex-1 rounded-lg bg-void/60 border border-border px-3 py-2 text-sm focus-ring"
          />
          <button
            type="submit"
            className="rounded-lg bg-moonviolet hover:bg-moonviolet-dark transition-colors px-4 py-2 text-sm font-medium focus-ring"
          >
            Send
          </button>
        </form>
        {error && <div className="px-3 pb-3 text-xs text-danger">{error}</div>}
      </GlassCard>
    </div>
  );
}
