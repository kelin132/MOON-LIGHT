import GlassCard from '@/components/GlassCard';

export const metadata = { title: 'Legacy' };

export default function LegacyPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl">Legacy</h1>
        <p className="text-text-lo mt-1">Past seasons, retired guilds, and Haven history.</p>
      </div>

      <GlassCard hover={false} className="py-10 text-center text-text-lo text-sm">
        Nothing archived yet — past-season data will show up here once a season ends.
      </GlassCard>
    </div>
  );
}
