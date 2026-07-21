import GlassCard from '@/components/GlassCard';

export const metadata = { title: 'Map' };

export default function MapPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Map</h1>
        <p className="text-text-lo mt-1">Explore the Haven&apos;s world.</p>
      </div>

      <GlassCard hover={false} className="aspect-video flex items-center justify-center">
        <p className="text-text-lo text-sm">
          Wire this up to your world/region data — this is a placeholder canvas.
        </p>
      </GlassCard>
    </div>
  );
}
