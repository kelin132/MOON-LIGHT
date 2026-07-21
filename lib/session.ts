import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import { isStaff } from '@/lib/roles';

export async function getCurrentSession() {
  return getServerSession(authOptions);
}

/** Full Mongo user document for the signed-in account, or null. */
export async function getCurrentUser(): Promise<any> {
  const session = await getCurrentSession();
  if (!session?.user?.moonId) return null;
  await dbConnect();
  return User.findOne({ moonId: session.user.moonId }).lean();
}

/** Throws-free guard for use inside API routes / server components. */
export async function requireStaff() {
  const session = await getCurrentSession();
  const role = session?.user?.role;
  return isStaff(role) ? session : null;
}
