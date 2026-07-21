import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/session';
import dbConnect from '@/lib/mongodb';
import Card from '@/lib/models/Card';

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  await dbConnect();
  const cards = await Card.find({}).sort({ price: 1 }).limit(300).lean();
  return NextResponse.json({ cards });
}
