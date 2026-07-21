import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/session';
import dbConnect from '@/lib/mongodb';
import Guild from '@/lib/models/Guild';

export async function GET() {
  const session = await requireStaff();
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  await dbConnect();
  const guilds = await Guild.find({}).sort({ memberCount: -1 }).limit(500).lean();
  return NextResponse.json({ guilds });
}

export async function DELETE(req: Request) {
  const session = await requireStaff();
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing guild id' }, { status: 400 });

  await dbConnect();
  await Guild.deleteOne({ _id: id });
  return NextResponse.json({ ok: true });
}
