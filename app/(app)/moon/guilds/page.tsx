import { guardStaffPage } from '@/lib/guardStaffPage';
import StaffGuildsTable from './StaffGuildsTable';

export const metadata = { title: 'Staff · Guilds' };

export default async function StaffGuildsPage() {
  await guardStaffPage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Guilds</h1>
        <p className="text-text-lo mt-1">Moderate guilds across the Haven.</p>
      </div>
      <StaffGuildsTable />
    </div>
  );
}
