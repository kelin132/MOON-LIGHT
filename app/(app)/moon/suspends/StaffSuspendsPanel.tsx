'use client';

import { useEffect, useState } from 'react';
import GlassCard from '@/components/GlassCard';

type Suspension = {
  _id: string;
  targetMoonId: string;
  reason: string;
  issuedByMoonId: string;
  active: boolean;
  createdAt: string;
};

export default function StaffSuspendsPanel() {
  const [suspensions, setSuspensions] = useState<Suspension[]>([]);
  const [loading, setLoading] = useState(true);
  const [targetMoonId, setTargetMoonId] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    const res = await fetch('/api/staff/suspend');
    const data = await res.json();
    setSuspensions(data.suspensions || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSuspend(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await fetch('/api/staff/suspend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetMoonId, action: 'suspend', reason }),
    });

    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Failed to suspend user.');
      return;
    }

    setTargetMoonId('');
    setReason('');
    load();
  }

  async function handleUnsuspend(moonId: string) {
    await fetch('/api/staff/suspend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetMoonId: moonId, action: 'unsuspend' }),
    });
    load();
  }

  return (
    <div className="space-y-6">
      <GlassCard hover={false}>
        <h2 className="font-medium mb-3">Suspend a member</h2>
        <form onSubmit={handleSuspend} className="flex flex-col sm:flex-row gap-3">
          <input
            value={targetMoonId}
            onChange={(e) => setTargetMoonId(e.target.value)}
            placeholder="Moon ID"
            required
            className="flex-1 rounded-lg bg-void/60 border border-border px-3 py-2 text-sm focus-ring"
          />
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason"
            className="flex-1 rounded-lg bg-void/60 border border-border px-3 py-2 text-sm focus-ring"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-danger/90 hover:bg-danger transition-colors px-4 py-2 text-sm font-medium focus-ring disabled:opacity-50"
          >
            Suspend
          </button>
        </form>
        {error && <div className="text-sm text-danger mt-2">{error}</div>}
      </GlassCard>

      {loading ? (
        <div className="text-text-lo">Loading…</div>
      ) : (
        <GlassCard hover={false} className="!p-0 divide-y divide-border">
          {suspensions.length === 0 && (
            <div className="px-5 py-8 text-center text-text-lo text-sm">No suspensions on record.</div>
          )}
          {suspensions.map((s) => (
            <div key={s._id} className="px-5 py-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-medium">@{s.targetMoonId}</div>
                <div className="text-xs text-text-lo">{s.reason || 'No reason given'}</div>
                <div className="text-[11px] text-text-lo font-mono mt-0.5">
                  by {s.issuedByMoonId} · {new Date(s.createdAt).toLocaleString()}
                </div>
              </div>
              {s.active ? (
                <button
                  onClick={() => handleUnsuspend(s.targetMoonId)}
                  className="text-xs text-success hover:underline shrink-0 focus-ring"
                >
                  Unsuspend
                </button>
              ) : (
                <span className="text-xs text-text-lo shrink-0">Lifted</span>
              )}
            </div>
          ))}
        </GlassCard>
      )}
    </div>
  );
}
