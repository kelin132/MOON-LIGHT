import Image from 'next/image';
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import Card from '@/lib/models/Card';
import GlassCard from '@/components/GlassCard';
import { rarityStyle } from '@/lib/rarity';

export const dynamic = 'force-dynamic';

export default async function CardDetailPage({ params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) return notFound();

  await dbConnect();
  const card: any = await Card.findById(params.id).lean();
  if (!card) return notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <GlassCard className="!p-0 overflow-hidden">
        <div className="relative h-64 w-full bg-surface2">
          {card.imageUrl ? (
            <Image src={card.imageUrl} alt="" fill className="object-cover" unoptimized />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-moonviolet/25 to-void" />
          )}
        </div>
        <div className="p-6">
          <div
            className={`text-xs font-mono uppercase tracking-wider border rounded-full w-fit px-2.5 py-1 mb-3 ${rarityStyle(card.rarity)}`}
          >
            {card.rarity || 'Common'}
          </div>
          <h1 className="font-display text-3xl mb-2">{card.name}</h1>
          <p className="text-text-lo">{card.description || 'No description available.'}</p>
          <div className="mt-6 text-moongold font-mono text-lg">{card.price ?? 0} coins</div>
        </div>
      </GlassCard>
    </div>
  );
}
