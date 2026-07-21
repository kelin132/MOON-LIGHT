import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import { getCurrentUser } from '@/lib/session';

export const metadata = { title: 'Casino' };
export const dynamic = 'force-dynamic';

const GAMES = [
  { href: '/casinos/slots', title: 'Slots', body: 'Spin three reels — match symbols for a payout.', icon: '🎰' },
  { href: '/casinos/bet', title: 'Bet', body: 'Call high or low on a 1–100 roll, double or nothing.', icon: '🎲' },
];

export default async function CasinoPage() {
  const user: any = await getCurrentUser();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl">Casino Floor</h1>
          <p className="text-text-lo mt-1">Play with your Haven coins — no real money involved.</p>
        </div>
        <div className="rounded-lg border border-moongold/30 bg-moongold/10 px-4 py-2 text-moongold font-mono">
          {user?.coins ?? 0} coins
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {GAMES.map((g) => (
          <Link key={g.href} href={g.href}>
            <GlassCard className="h-full">
              <div className="text-4xl mb-3">{g.icon}</div>
              <h2 className="font-display text-xl">{g.title}</h2>
              <p className="text-sm text-text-lo mt-1">{g.body}</p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
