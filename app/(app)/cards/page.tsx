import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/mongodb';
import Card from '@/lib/models/Card';
import GlassCard from '@/components/GlassCard';
import { rarityStyle } from '@/lib/rarity';

export const metadata = { title: 'Cards' };
export const dynamic = 'force-dynamic';

export default async function CardsPage() {
  await dbConnect();
  const cards = await Card.find({}).sort({ createdAt: -1 }).limit(300).lean();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Cards</h1>
        <p className="text-text-lo mt-1">Browse the full card catalogue.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card: any) => (
          <Link key={String(card._id)} href={`/cards/${card._id}`}>
            <GlassCard className="!p-0 overflow-hidden h-full flex flex-col">
              <div className="relative h-40 w-full bg-surface2">
                {card.imageUrl ? (
                  <Image src={card.imageUrl} alt="" fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-moonviolet/25 to-void" />
                )}
              </div>
              <div className="p-4">
                <div
                  className={`text-[10px] font-mono uppercase tracking-wider border rounded-full w-fit px-2 py-0.5 mb-2 ${rarityStyle(card.rarity)}`}
                >
                  {card.rarity || 'Common'}
                </div>
                <h3 className="font-medium">{card.name}</h3>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
