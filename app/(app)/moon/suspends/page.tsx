import { guardStaffPage } from '@/lib/guardStaffPage';
import StaffSuspendsPanel from './StaffSuspendsPanel';

export const metadata = { title: 'Staff · Suspensions' };

export default async function StaffSuspendsPage() {
  await guardStaffPage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Suspensions</h1>
        <p className="text-text-lo mt-1">Suspend, unsuspend, and review suspension history.</p>
      </div>
      <StaffSuspendsPanel />
    </div>
  );
}
