import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/session';
import dbConnect from '@/lib/mongodb';
import ChatMessage from '@/lib/models/ChatMessage';

export async function GET() {
  const session = await requireStaff();
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  await dbConnect();
  const messages = await ChatMessage.find({}).sort({ createdAt: -1 }).limit(150).lean();
  return NextResponse.json({ messages });
}

export async function DELETE(req: Request) {
  const session = await requireStaff();
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing message id' }, { status: 400 });

  await dbConnect();
  await ChatMessage.deleteOne({ _id: id });
  return NextResponse.json({ ok: true });
}
