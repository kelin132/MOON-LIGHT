import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/session';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';

const SYMBOLS = ['🌙', '⭐', '💎', '🍀', '🔮', '👑'];
// Payout multipliers for three-of-a-kind, by symbol.
const PAYOUTS: Record<string, number> = {
  '🌙': 2,
  '⭐': 3,
  '🍀': 4,
  '🔮': 6,
  '💎': 10,
  '👑': 25,
};

function spinReel() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

export async function POST(req: Request) {
  const session = await getCurrentSession();
  if (!session?.user?.moonId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await req.json();
  const wager = Number(body.wager);

  if (!Number.isFinite(wager) || wager <= 0 || !Number.isInteger(wager)) {
    return NextResponse.json({ error: 'Invalid wager' }, { status: 400 });
  }

  await dbConnect();

  // Atomically deduct the wager only if the user can afford it — avoids a
  // race where two rapid requests both pass a balance check separately.
  const debited = await User.findOneAndUpdate(
    { moonId: session.user.moonId, coins: { $gte: wager }, suspended: { $ne: true } },
    { $inc: { coins: -wager } },
    { new: true }
  );

  if (!debited) {
    return NextResponse.json({ error: 'Insufficient coins, or account suspended' }, { status: 400 });
  }

  const reels = [spinReel(), spinReel(), spinReel()];
  let payout = 0;
  if (reels[0] === reels[1] && reels[1] === reels[2]) {
    payout = wager * (PAYOUTS[reels[0]] || 2);
  } else if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
    payout = Math.floor(wager * 1.2); // small consolation for a pair
  }

  const finalUser = payout > 0
    ? await User.findOneAndUpdate(
        { moonId: session.user.moonId },
        { $inc: { coins: payout } },
        { new: true }
      )
    : debited;

  return NextResponse.json({
    reels,
    payout,
    net: payout - wager,
    balance: finalUser?.coins ?? debited.coins,
  });
}
