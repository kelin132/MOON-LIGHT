import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/session';
import { isStaff } from '@/lib/roles';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';

const ASSIGNABLE_ROLES = ['Member', 'Staff', 'Mod', 'Owner', 'True Owner'];

export async function GET() {
  const session = await getCurrentSession();
  if (!isStaff(session?.user?.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  await dbConnect();
  const users = await User.find({})
    .select('moonId username role coins level suspended')
    .limit(500)
    .lean();

  return NextResponse.json({ users });
}

export async function PATCH(req: Request) {
  const session = await getCurrentSession();
  const actingRole = session?.user?.role;

  // Only True Owner / Owner can change roles — Mod/Staff can view this
  // page but not promote/demote anyone.
  if (actingRole !== 'True Owner' && actingRole !== 'Owner') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const { moonId, role } = body;

  if (!moonId || !ASSIGNABLE_ROLES.includes(role)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Only True Owner can create/edit another True Owner.
  if (role === 'True Owner' && actingRole !== 'True Owner') {
    return NextResponse.json({ error: 'Only a True Owner can assign that role' }, { status: 403 });
  }

  await dbConnect();
  await User.updateOne({ moonId }, { $set: { role } });

  return NextResponse.json({ ok: true });
}
