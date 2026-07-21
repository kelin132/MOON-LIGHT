'use client';

import { useEffect, useState } from 'react';
import GlassCard from '@/components/GlassCard';

type Msg = { _id: string; moonId: string; username?: string; body: string; channel: string; createdAt: string };

export default function StaffChatLog() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/staff/chat')
      .then((r) => r.json())
      .then((d) => {
        setMessages(d.messages || []);
        setLoading(false);
      });
  }, []);

  async function removeMessage(id: string) {
    const res = await fetch(`/api/staff/chat?id=${id}`, { method: 'DELETE' });
    if (res.ok) setMessages((prev) => prev.filter((m) => m._id !== id));
  }

  if (loading) return <div className="text-text-lo">Loading…</div>;

  return (
    <GlassCard hover={false} className="!p-0 divide-y divide-border">
      {messages.map((m) => (
        <div key={m._id} className="px-5 py-3 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs font-mono text-text-lo">
              #{m.channel} · {m.username || m.moonId} ·{' '}
              {new Date(m.createdAt).toLocaleString()}
            </div>
            <p className="text-sm mt-0.5">{m.body}</p>
          </div>
          <button
            onClick={() => removeMessage(m._id)}
            className="text-xs text-danger hover:underline shrink-0 focus-ring"
          >
            Delete
          </button>
        </div>
      ))}
    </GlassCard>
  );
}
