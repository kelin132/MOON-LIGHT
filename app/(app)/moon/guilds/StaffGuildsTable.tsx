'use client';

import { useEffect, useState } from 'react';
import GlassCard from '@/components/GlassCard';

type GuildRow = { _id: string; name: string; memberCount: number; ownerMoonId?: string };

export default function StaffGuildsTable() {
  const [guilds, setGuilds] = useState<GuildRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/staff/guilds')
      .then((r) => r.json())
      .then((d) => {
        setGuilds(d.guilds || []);
        setLoading(false);
      });
  }, []);

  async function removeGuild(id: string) {
    if (!confirm('Delete this guild? This cannot be undone.')) return;
    const res = await fetch(`/api/staff/guilds?id=${id}`, { method: 'DELETE' });
    if (res.ok) setGuilds((prev) => prev.filter((g) => g._id !== id));
  }

  if (loading) return <div className="text-text-lo">Loading…</div>;

  return (
    <GlassCard hover={false} className="!p-0 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-text-lo font-mono text-xs border-b border-border">
            <th className="px-5 py-3">Guild</th>
            <th className="px-5 py-3">Owner</th>
            <th className="px-5 py-3">Members</th>
            <th className="px-5 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {guilds.map((g) => (
            <tr key={g._id} className="border-b border-border/50 last:border-0">
              <td className="px-5 py-3 font-medium">{g.name}</td>
              <td className="px-5 py-3 font-mono text-xs text-text-lo">{g.ownerMoonId || '—'}</td>
              <td className="px-5 py-3 font-mono">{g.memberCount ?? 0}</td>
              <td className="px-5 py-3 text-right">
                <button
                  onClick={() => removeGuild(g._id)}
                  className="text-xs text-danger hover:underline focus-ring"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlassCard>
  );
}
