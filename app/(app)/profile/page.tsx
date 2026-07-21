import Link from 'next/link';
import Image from 'next/image';
import { getCurrentUser } from '@/lib/session';
import MoonArc from '@/components/MoonArc';
import GlassCard from '@/components/GlassCard';

export const metadata = { title: 'Profile' };

export default async function ProfilePage() {
  const user: any = await getCurrentUser();
  const xpForNext = 1000;
  const progress = Math.min(1, (user?.xp ?? 0) / xpForNext);

  return (
    <div className="space-y-6">
      <div className="relative rounded-2xl overflow-hidden h-40 md:h-56 border border-border">
        {user?.bannerUrl ? (
          <Image src={user.bannerUrl} alt="" fill className="object-cover" unoptimized />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-moonviolet/30 via-surface to-void" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void/80 to-transparent" />
      </div>

      <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16 md:-mt-20 px-2">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-void bg-surface overflow-hidden shrink-0 relative">
          {user?.avatarUrl ? (
            <Image src={user.avatarUrl} alt="" fill className="object-cover" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-display text-3xl text-moonviolet-light">
              {(user?.username || user?.moonId || '?')[0]?.toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-3xl">{user?.username || user?.moonId}</h1>
          <p className="text-text-lo font-mono text-sm">@{user?.moonId}</p>
        </div>
        <Link
          href="/profile/edit"
          className="rounded-lg border border-border hover:border-moonviolet/50 px-4 py-2 text-sm transition-colors focus-ring"
        >
          Edit profile
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard hover={false} className="!p-4 text-center">
          <MoonArc size={44} progress={progress} />
          <div className="mt-2 text-xs text-text-lo font-mono">Level {user?.level ?? 1}</div>
        </GlassCard>
        <GlassCard hover={false} className="!p-4 text-center">
          <div className="font-display text-2xl text-moongold">{user?.coins ?? 0}</div>
          <div className="mt-1 text-xs text-text-lo font-mono">Coins</div>
        </GlassCard>
        <GlassCard hover={false} className="!p-4 text-center">
          <div className="font-display text-2xl">{user?.xp ?? 0}</div>
          <div className="mt-1 text-xs text-text-lo font-mono">XP</div>
        </GlassCard>
        <GlassCard hover={false} className="!p-4 text-center">
          <div className="font-display text-2xl">{user?.role ?? 'Member'}</div>
          <div className="mt-1 text-xs text-text-lo font-mono">Role</div>
        </GlassCard>
      </div>

      <GlassCard>
        <h2 className="font-display text-xl mb-2">Bio</h2>
        <p className="text-text-lo whitespace-pre-wrap">
          {user?.bio || 'No bio yet — add one from Edit profile.'}
        </p>
      </GlassCard>
    </div>
  );
}
