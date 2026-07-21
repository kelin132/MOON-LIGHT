'use client';

import { useState } from 'react';
import clsx from 'clsx';
import GlassCard from '@/components/GlassCard';

export default function BetPage() {
  const [wager, setWager] = useState(10);
  const [choice, setChoice] = useState<'high' | 'low'>('high');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ roll: number; won: boolean; net: number; balance: number } | null>(null);

  async function placeBet() {
    setLoading(true);
    setError(null);
    setResult(null);

    const res = await fetch('/api/casino/bet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wager, choice }),
    });
    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Bet failed.');
      return;
    }

    setResult(data);
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="font-display text-3xl">Bet</h1>
        <p className="text-text-lo mt-1 text-sm">Call it on a 1–100 roll. High wins on 51–100.</p>
      </div>

      <GlassCard hover={false} className="text-center">
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setChoice('low')}
            className={clsx(
              'flex-1 rounded-xl border py-4 transition-colors focus-ring',
              choice === 'low'
                ? 'border-moonviolet bg-moonviolet/15 text-moonviolet-light'
                : 'border-border text-text-lo hover:text-text-hi'
            )}
          >
            <div className="font-display text-lg">Low</div>
            <div className="text-xs font-mono">1–50</div>
          </button>
          <button
            onClick={() => setChoice('high')}
            className={clsx(
              'flex-1 rounded-xl border py-4 transition-colors focus-ring',
              choice === 'high'
                ? 'border-moonviolet bg-moonviolet/15 text-moonviolet-light'
                : 'border-border text-text-lo hover:text-text-hi'
            )}
          >
            <div className="font-display text-lg">High</div>
            <div className="text-xs font-mono">51–100</div>
          </button>
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
          onClick={placeBet}
          disabled={loading}
          className="rounded-lg bg-moonviolet hover:bg-moonviolet-dark transition-colors px-6 py-2.5 font-medium focus-ring disabled:opacity-50"
        >
          {loading ? 'Rolling…' : 'Place bet'}
        </button>

        {error && <div className="mt-4 text-sm text-danger">{error}</div>}

        {result && (
          <div className="mt-5 pt-4 border-t border-border">
            <div className="font-display text-3xl mb-1">{result.roll}</div>
            <div className={result.won ? 'text-success' : 'text-danger'}>
              {result.won ? `Won +${result.net}` : `Lost ${result.net}`} coins
            </div>
            <div className="text-xs text-text-lo font-mono mt-1">Balance: {result.balance}</div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
