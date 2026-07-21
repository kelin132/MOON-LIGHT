import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/session';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  await dbConnect();
  const users = await User.find({})
    .sort({ xp: -1 })
    .limit(100)
    .select('moonId username avatarUrl xp level coins')
    .lean();

  return NextResponse.json({ users });
}
