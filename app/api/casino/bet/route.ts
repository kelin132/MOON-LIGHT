import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/session';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(req: Request) {
  const session = await getCurrentSession();
  if (!session?.user?.moonId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await req.json();
  const wager = Number(body.wager);
  const choice = body.choice === 'high' ? 'high' : 'low'; // roll 1-100, high = 51-100

  if (!Number.isFinite(wager) || wager <= 0 || !Number.isInteger(wager)) {
    return NextResponse.json({ error: 'Invalid wager' }, { status: 400 });
  }

  await dbConnect();

  const debited = await User.findOneAndUpdate(
    { moonId: session.user.moonId, coins: { $gte: wager }, suspended: { $ne: true } },
    { $inc: { coins: -wager } },
    { new: true }
  );

  if (!debited) {
    return NextResponse.json({ error: 'Insufficient coins, or account suspended' }, { status: 400 });
  }

  const roll = Math.floor(Math.random() * 100) + 1; // 1-100
  const result = roll > 50 ? 'high' : 'low';
  const won = result === choice;
  const payout = won ? wager * 2 : 0;

  const finalUser = payout > 0
    ? await User.findOneAndUpdate(
        { moonId: session.user.moonId },
        { $inc: { coins: payout } },
        { new: true }
      )
    : debited;

  return NextResponse.json({
    roll,
    result,
    won,
    payout,
    net: payout - wager,
    balance: finalUser?.coins ?? debited.coins,
  });
}
