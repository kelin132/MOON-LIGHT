import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import GlassCard from '@/components/GlassCard';
import { STAFF_ROLES } from '@/lib/roles';

export const metadata = { title: 'Our Team' };
export const dynamic = 'force-dynamic';

const ROLE_ORDER = ['True Owner', 'Owner', 'Mod', 'Staff'];

export default async function TeamPage() {
  await dbConnect();
  const staff = await User.find({ role: { $in: STAFF_ROLES } })
    .select('moonId username avatarUrl role teamDescription')
    .lean();

  const sorted = [...staff].sort(
    (a: any, b: any) => ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Our Team</h1>
        <p className="text-text-lo mt-1">The people who keep Moonlight Haven running.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sorted.map((member: any) => (
          <GlassCard key={String(member._id)} className="text-center">
            <div className="w-16 h-16 rounded-full bg-surface2 mx-auto mb-3 overflow-hidden flex items-center justify-center font-display text-xl text-moonviolet-light">
              {(member.username || member.moonId)[0]?.toUpperCase()}
            </div>
            <h3 className="font-medium">{member.username || member.moonId}</h3>
            <div className="text-xs font-mono text-moongold mt-1">{member.role}</div>
            <p className="text-sm text-text-lo mt-2">
              {member.teamDescription || 'No description yet.'}
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
