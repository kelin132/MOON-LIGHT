import Link from 'next/link';
import GlassCard from '@/components/GlassCard';

export const metadata = { title: 'Support' };

const TOPICS = [
  { title: 'Account issues', body: 'Locked out, suspended, or your Moon ID looks wrong.' },
  { title: 'Coins & purchases', body: 'A shop purchase didn\u2019t go through or coins look off.' },
  { title: 'Report a member', body: 'Harassment, cheating, or rule-breaking behavior.' },
  { title: 'Bug report', body: 'Something on the site or bot isn\u2019t working right.' },
];

export default function SupportPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="font-display text-3xl">Support</h1>
        <p className="text-text-lo mt-1">Get help from the Haven team.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {TOPICS.map((t) => (
          <GlassCard key={t.title} hover={false}>
            <h2 className="font-medium mb-1">{t.title}</h2>
            <p className="text-sm text-text-lo">{t.body}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard hover={false} className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-medium">Want to meet the team?</h2>
          <p className="text-sm text-text-lo">See who&apos;s behind Moonlight Haven.</p>
        </div>
        <Link
          href="/support/team"
          className="rounded-lg bg-moonviolet hover:bg-moonviolet-dark transition-colors px-4 py-2 text-sm font-medium focus-ring"
        >
          View team
        </Link>
      </GlassCard>
    </div>
  );
}
