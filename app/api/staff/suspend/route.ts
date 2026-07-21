import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/session';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import Suspension from '@/lib/models/Suspension';

export async function GET() {
  const session = await requireStaff();
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  await dbConnect();
  const suspensions = await Suspension.find({}).sort({ createdAt: -1 }).limit(200).lean();
  return NextResponse.json({ suspensions });
}

export async function POST(req: Request) {
  const session = await requireStaff();
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const { targetMoonId, action, reason } = body;

  if (!targetMoonId || !['suspend', 'unsuspend'].includes(action)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  await dbConnect();

  const target: any = await User.findOne({ moonId: targetMoonId }).lean();
  if (!target) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  // Staff can't suspend other staff — only Owner/True Owner would do that
  // through a separate role-change flow, not this quick-action endpoint.
  if (action === 'suspend' && target.role && target.role !== 'Member') {
    return NextResponse.json({ error: 'Cannot suspend a staff member here' }, { status: 400 });
  }

  await User.updateOne(
    { moonId: targetMoonId },
    { $set: { suspended: action === 'suspend', suspendedReason: action === 'suspend' ? reason || null : null } }
  );

  if (action === 'suspend') {
    await Suspension.create({
      targetMoonId,
      reason: reason || '',
      issuedByMoonId: session.user?.moonId,
      active: true,
    });
  } else {
    await Suspension.updateMany(
      { targetMoonId, active: true },
      { $set: { active: false } }
    );
  }

  return NextResponse.json({ ok: true });
}
