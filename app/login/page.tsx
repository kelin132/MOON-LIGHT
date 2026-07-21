'use client';


import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import MoonArc from '@/components/MoonArc';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [moonId, setMoonId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn('credentials', {
      moonId,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!res || res.error) {
      if (res?.error === 'SUSPENDED') {
        setError('This account is suspended. Contact staff for details.');
      } else {
        setError('Moon ID or password is incorrect.');
      }
      return;
    }

    router.push(params.get('callbackUrl') || '/profile');
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-moon-glow px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <MoonArc size={56} progress={0.7} />
          <h1 className="mt-4 font-display text-3xl tracking-wide">Moonlight Haven</h1>
          <p className="mt-1 text-sm text-text-lo text-center">
            Sign in with the Moon ID from your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
          <div>
            <label htmlFor="moonId" className="block text-xs font-mono text-text-lo mb-1.5">
              MOON ID
            </label>
            <input
              id="moonId"
              type="text"
              required
              autoComplete="username"
              value={moonId}
              onChange={(e) => setMoonId(e.target.value)}
              className="w-full rounded-lg bg-void/60 border border-border px-3 py-2.5 text-text-hi placeholder:text-text-lo/50 focus-ring"
              placeholder="e.g. moon_1029"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-mono text-text-lo mb-1.5">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-void/60 border border-border px-3 py-2.5 text-text-hi placeholder:text-text-lo/50 focus-ring"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-sm text-danger bg-danger/10 border border-danger/30 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-moonviolet hover:bg-moonviolet-dark transition-colors py-2.5 font-medium focus-ring disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="text-xs text-text-lo text-center pt-1">
            Accounts are created through the Moonlight Haven bot — there&apos;s no sign-up here.
          </p>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
