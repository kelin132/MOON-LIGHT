import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import GlassCard from '@/components/GlassCard';

export const metadata = { title: 'Members' };
export const dynamic = 'force-dynamic';

export default async function MembersPage() {
  await dbConnect();
  const users = await User.find({})
    .select('moonId username avatarUrl role level')
    .limit(300)
    .lean();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Members</h1>
        <p className="text-text-lo mt-1">Everyone in the Haven.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u: any) => (
          <Link key={String(u._id)} href={`/user/${u.moonId}`}>
            <GlassCard className="flex items-center gap-3 !p-4">
              <div className="w-11 h-11 rounded-full bg-surface2 shrink-0 overflow-hidden flex items-center justify-center font-display text-moonviolet-light">
                {(u.username || u.moonId)[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="font-medium truncate">{u.username || u.moonId}</div>
                <div className="text-xs text-text-lo font-mono">
                  {u.role || 'Member'} · Lv. {u.level ?? 1}
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
