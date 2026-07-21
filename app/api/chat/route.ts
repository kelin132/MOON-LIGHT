import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/session';
import dbConnect from '@/lib/mongodb';
import ChatMessage from '@/lib/models/ChatMessage';
import User from '@/lib/models/User';

export async function GET(req: Request) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const channel = searchParams.get('channel') || 'general';

  await dbConnect();
  const messages = await ChatMessage.find({ channel })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  return NextResponse.json({ messages: messages.reverse() });
}

export async function POST(req: Request) {
  const session = await getCurrentSession();
  if (!session?.user?.moonId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  await dbConnect();
  const account: any = await User.findOne({ moonId: session.user.moonId }).lean();
  if (account?.suspended) {
    return NextResponse.json({ error: 'Your account is suspended' }, { status: 403 });
  }

  const body = await req.json();
  const text = (body.body || '').toString().trim();
  if (!text) return NextResponse.json({ error: 'Message is empty' }, { status: 400 });
  if (text.length > 1000) {
    return NextResponse.json({ error: 'Message is too long' }, { status: 400 });
  }

  const message = await ChatMessage.create({
    moonId: session.user.moonId,
    username: session.user.name,
    body: text,
    channel: body.channel || 'general',
  });

  return NextResponse.json({ message });
}
