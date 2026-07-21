import { redirect } from 'next/navigation';
import { getCurrentSession } from '@/lib/session';
import { isStaff } from '@/lib/roles';

/** Call at the top of every /moon/* server component. */
export async function guardStaffPage() {
  const session = await getCurrentSession();
  if (!isStaff(session?.user?.role)) {
    redirect('/403');
  }
  return session;
}
