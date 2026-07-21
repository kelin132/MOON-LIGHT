import GlassCard from '@/components/GlassCard';

export const metadata = { title: 'Rules' };

const RULES = [
  {
    title: 'Respect the Haven',
    body: 'Harassment, hate speech, and targeted abuse toward any member get you suspended, no warnings on repeat offenses.',
  },
  {
    title: 'No real-money trading',
    body: 'Coins, cards, and casino chips are in-Haven currency only. Buying or selling them for real money outside the platform is not allowed.',
  },
  {
    title: 'One account per person',
    body: 'Alt accounts used to farm coins, XP, or casino winnings will be suspended along with the main account.',
  },
  {
    title: 'Exploit reporting',
    body: 'Found a bug that gives you an unfair edge? Report it in Support instead of abusing it — abuse is treated as cheating.',
  },
  {
    title: 'Staff decisions are final',
    body: 'Suspensions and warnings can be appealed through Support, but staff have final say while a review is in progress.',
  },
];

export default function RulesPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl">Rules</h1>
        <p className="text-text-lo mt-1">Keep it simple, keep it fair.</p>
      </div>

      <div className="space-y-4">
        {RULES.map((rule, i) => (
          <GlassCard key={rule.title} hover={false} className="flex gap-4">
            <div className="font-display text-2xl text-moonviolet/50 shrink-0">
              {String(i + 1).padStart(2, '0')}
            </div>
            <div>
              <h2 className="font-medium mb-1">{rule.title}</h2>
              <p className="text-sm text-text-lo">{rule.body}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
