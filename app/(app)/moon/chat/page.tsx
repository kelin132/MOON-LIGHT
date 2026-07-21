import { guardStaffPage } from '@/lib/guardStaffPage';
import StaffChatLog from './StaffChatLog';

export const metadata = { title: 'Staff · Chat Logs' };

export default async function StaffChatPage() {
  await guardStaffPage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Chat Logs</h1>
        <p className="text-text-lo mt-1">Recent messages across all channels.</p>
      </div>
      <StaffChatLog />
    </div>
  );
}
