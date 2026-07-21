'use client';

import { useState } from 'react';
import GlassCard from '@/components/GlassCard';

export default function SlotsPage() {
  const [wager, setWager] = useState(10);
  const [reels, setReels] = useState(['🌙', '⭐', '💎']);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{ payout: number; net: number; balance: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function spin() {
    setSpinning(true);
    setError(null);
    setResult(null);

    const res = await fetch('/api/casino/slots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wager }),
    });
    const data = await res.json();

    setSpinning(false);

    if (!res.ok) {
      setError(data.error || 'Spin failed.');
      return;
    }

    setReels(data.reels);
    setResult({ payout: data.payout, net: data.net, balance: data.balance });
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="font-display text-3xl">Slots</h1>
        <p className="text-text-lo mt-1 text-sm">Match all three for the big payout.</p>
      </div>

      <GlassCard hover={false} className="text-center">
        <div className="flex justify-center gap-3 text-5xl mb-6">
          {reels.map((r, i) => (
            <div
              key={i}
              className={`w-20 h-20 rounded-xl bg-void/60 border border-border flex items-center justify-center ${spinning ? 'animate-pulse' : ''}`}
            >
              {r}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <label className="text-xs font-mono text-text-lo">WAGER</label>
          <input
            type="number"
            min={1}
            value={wager}
            onChange={(e) => setWager(Math.max(1, Number(e.target.value)))}
            className="w-24 rounded-lg bg-void/60 border border-border px-3 py-1.5 text-center focus-ring"
          />
        </div>

        <button
          onClick={spin}
          disabled={spinning}
          className="rounded-lg bg-moonviolet hover:bg-moonviolet-dark transition-colors px-6 py-2.5 font-medium focus-ring disabled:opacity-50"
        >
          {spinning ? 'Spinning…' : 'Spin'}
        </button>

        {error && <div className="mt-4 text-sm text-danger">{error}</div>}

        {result && (
          <div className="mt-5 pt-4 border-t border-border">
            <div className={result.net > 0 ? 'text-success' : result.net === 0 ? 'text-text-lo' : 'text-danger'}>
              {result.net > 0 ? `+${result.net}` : result.net} coins
            </div>
            <div className="text-xs text-text-lo font-mono mt-1">Balance: {result.balance}</div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
