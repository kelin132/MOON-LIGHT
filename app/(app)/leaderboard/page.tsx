import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import GlassCard from '@/components/GlassCard';

export const metadata = { title: 'Leaderboard' };
export const dynamic = 'force-dynamic';

const MEDAL = ['🥇', '🥈', '🥉'];

export default async function LeaderboardPage() {
  await dbConnect();
  const users = await User.find({})
    .sort({ xp: -1 })
    .limit(100)
    .select('moonId username avatarUrl xp level coins')
    .lean();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Leaderboard</h1>
        <p className="text-text-lo mt-1">Top members of the Haven, ranked by XP.</p>
      </div>

      <GlassCard className="!p-0" hover={false}>
        <div className="divide-y divide-border">
          {users.map((u: any, i: number) => (
            <Link
              key={String(u._id)}
              href={`/user/${u.moonId}`}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/5 transition-colors"
            >
              <div className="w-8 text-center font-mono text-text-lo">
                {MEDAL[i] || `#${i + 1}`}
              </div>
              <div className="w-9 h-9 rounded-full bg-surface2 shrink-0 overflow-hidden flex items-center justify-center font-display text-sm text-moonviolet-light">
                {(u.username || u.moonId)[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{u.username || u.moonId}</div>
                <div className="text-xs text-text-lo font-mono">Level {u.level ?? 1}</div>
              </div>
              <div className="font-mono text-sm text-moongold">{u.xp ?? 0} XP</div>
            </Link>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
