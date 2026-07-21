import { guardStaffPage } from '@/lib/guardStaffPage';
import StaffMembersTable from './StaffMembersTable';

export const metadata = { title: 'Staff · Members' };

export default async function StaffMembersPage() {
  const session = await guardStaffPage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Members</h1>
        <p className="text-text-lo mt-1">
          Manage roles. {session?.user?.role !== 'Owner' && session?.user?.role !== 'True Owner'
            ? 'You can view members but only Owners can change roles.'
            : ''}
        </p>
      </div>
      <StaffMembersTable canEditRoles={session?.user?.role === 'Owner' || session?.user?.role === 'True Owner'} />
    </div>
  );
}
