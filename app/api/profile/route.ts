import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/session';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function GET() {
  const session = await getCurrentSession();
  if (!session?.user?.moonId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  await dbConnect();
  const user = await User.findOne({ moonId: session.user.moonId }).lean();
  return NextResponse.json({ user });
}

function isLikelyImageUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

export async function PATCH(req: Request) {
  const session = await getCurrentSession();
  if (!session?.user?.moonId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await req.json();
  const update: Record<string, any> = {};

  if (typeof body.bio === 'string') {
    if (body.bio.length > 500) {
      return NextResponse.json({ error: 'Bio must be 500 characters or fewer' }, { status: 400 });
    }
    update.bio = body.bio;
  }

  if (typeof body.avatarUrl === 'string') {
    if (body.avatarUrl && !isLikelyImageUrl(body.avatarUrl)) {
      return NextResponse.json({ error: 'Avatar must be a valid image URL' }, { status: 400 });
    }
    update.avatarUrl = body.avatarUrl || null;
  }

  if (typeof body.bannerUrl === 'string') {
    if (body.bannerUrl && !isLikelyImageUrl(body.bannerUrl)) {
      return NextResponse.json({ error: 'Banner must be a valid image URL' }, { status: 400 });
    }
    update.bannerUrl = body.bannerUrl || null;
  }

  await dbConnect();
  const user = await User.findOneAndUpdate(
    { moonId: session.user.moonId },
    { $set: update },
    { new: true }
  ).lean();

  return NextResponse.json({ user });
}
