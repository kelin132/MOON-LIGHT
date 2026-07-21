import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/session';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import { STAFF_ROLES } from '@/lib/roles';

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  await dbConnect();
  const staff = await User.find({ role: { $in: STAFF_ROLES } })
    .select('moonId username avatarUrl role teamDescription')
    .lean();

  return NextResponse.json({ staff });
}
