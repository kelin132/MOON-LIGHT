'use client';

import { useEffect, useState } from 'react';
import GlassCard from '@/components/GlassCard';

const ROLES = ['Member', 'Staff', 'Mod', 'Owner', 'True Owner'];

type Member = {
  _id: string;
  moonId: string;
  username?: string;
  role: string;
  coins: number;
  level: number;
  suspended: boolean;
};

export default function StaffMembersTable({ canEditRoles }: { canEditRoles: boolean }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/staff/members')
      .then((r) => r.json())
      .then((d) => {
        setMembers(d.users || []);
        setLoading(false);
      });
  }, []);

  async function updateRole(moonId: string, role: string) {
    setSavingId(moonId);
    const res = await fetch('/api/staff/members', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moonId, role }),
    });
    if (res.ok) {
      setMembers((prev) => prev.map((m) => (m.moonId === moonId ? { ...m, role } : m)));
    }
    setSavingId(null);
  }

  if (loading) return <div className="text-text-lo">Loading…</div>;

  return (
    <GlassCard hover={false} className="!p-0 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-text-lo font-mono text-xs border-b border-border">
            <th className="px-5 py-3">Moon ID</th>
            <th className="px-5 py-3">Coins</th>
            <th className="px-5 py-3">Level</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Role</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m._id} className="border-b border-border/50 last:border-0">
              <td className="px-5 py-3">
                <div className="font-medium">{m.username || m.moonId}</div>
                <div className="text-xs text-text-lo font-mono">@{m.moonId}</div>
              </td>
              <td className="px-5 py-3 font-mono text-moongold">{m.coins}</td>
              <td className="px-5 py-3 font-mono">{m.level}</td>
              <td className="px-5 py-3">
                {m.suspended ? (
                  <span className="text-danger text-xs">Suspended</span>
                ) : (
                  <span className="text-success text-xs">Active</span>
                )}
              </td>
              <td className="px-5 py-3">
                {canEditRoles ? (
                  <select
                    value={m.role}
                    disabled={savingId === m.moonId}
                    onChange={(e) => updateRole(m.moonId, e.target.value)}
                    className="rounded-lg bg-void/60 border border-border px-2 py-1 text-xs focus-ring"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                ) : (
                  <span className="text-xs font-mono">{m.role}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlassCard>
  );
}
