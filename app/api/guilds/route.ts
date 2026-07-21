import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/session';
import dbConnect from '@/lib/mongodb';
import Guild from '@/lib/models/Guild';

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  await dbConnect();
  const guilds = await Guild.find({}).sort({ memberCount: -1 }).limit(200).lean();
  return NextResponse.json({ guilds });
}
