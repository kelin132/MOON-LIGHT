'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import clsx from 'clsx';
import MoonArc from './MoonArc';
import { isStaff } from '@/lib/roles';

const NAV_SECTIONS: { label: string; items: { href: string; label: string }[] }[] = [
  {
    label: 'Haven',
    items: [
      { href: '/profile', label: 'Profile' },
      { href: '/guild', label: 'Guild' },
      { href: '/members', label: 'Members' },
      { href: '/leaderboard', label: 'Leaderboard' },
      { href: '/mape', label: 'Map' },
    ],
  },
  {
    label: 'Marketplace',
    items: [
      { href: '/shop', label: 'Shop' },
      { href: '/cards', label: 'Cards' },
    ],
  },
  {
    label: 'Casino',
    items: [
      { href: '/casinos/casino', label: 'Casino Floor' },
      { href: '/casinos/slots', label: 'Slots' },
      { href: '/casinos/bet', label: 'Bet' },
    ],
  },
  {
    label: 'Community',
    items: [
      { href: '/chat', label: 'Chat' },
      { href: '/rules', label: 'Rules' },
      { href: '/lagacy', label: 'Legacy' },
    ],
  },
  {
    label: 'Support',
    items: [
      { href: '/support', label: 'Support' },
      { href: '/support/team', label: 'Our Team' },
      { href: '/add-bot', label: 'Add Bot' },
    ],
  },
];

const STAFF_ITEMS = [
  { href: '/moon/members', label: 'Members' },
  { href: '/moon/guilds', label: 'Guilds' },
  { href: '/moon/chat', label: 'Chat Logs' },
  { href: '/moon/suspends', label: 'Suspensions' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const role = session?.user?.role;

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const active = pathname === href || (href !== '/profile' && pathname?.startsWith(href));
    return (
      <Link
        href={href}
        onClick={() => setOpen(false)}
        className={clsx(
          'block px-3 py-2 rounded-lg text-sm transition-colors focus-ring',
          active
            ? 'bg-moonviolet/15 text-moonviolet-light font-medium'
            : 'text-text-lo hover:text-text-hi hover:bg-white/5'
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 glass sticky top-0 z-40">
        <Link href="/profile" className="flex items-center gap-2">
          <MoonArc size={28} progress={0.5} />
          <span className="font-display text-lg tracking-wide">Moonlight Haven</span>
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="p-2 text-text-hi focus-ring rounded-lg"
          aria-label="Toggle navigation"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      <aside
        className={clsx(
          'md:sticky md:top-0 md:flex md:h-screen md:w-64 flex-col border-r border-border bg-surface/40 backdrop-blur-xl px-4 py-6 overflow-y-auto',
          open ? 'flex fixed inset-0 z-30 w-full' : 'hidden'
        )}
      >
        <Link href="/profile" className="hidden md:flex items-center gap-3 mb-8 px-2">
          <MoonArc size={36} progress={0.5} />
          <div>
            <div className="font-display text-xl tracking-wide leading-none">Moonlight</div>
            <div className="font-display text-sm text-text-lo italic leading-none">Haven</div>
          </div>
        </Link>

        <nav className="flex-1 space-y-6">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <div className="px-3 mb-1 text-[11px] uppercase tracking-wider text-text-lo/70 font-mono">
                {section.label}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavLink key={item.href} {...item} />
                ))}
              </div>
            </div>
          ))}

          {isStaff(role) && (
            <div>
              <div className="px-3 mb-1 text-[11px] uppercase tracking-wider text-moongold/80 font-mono">
                Staff Dashboard
              </div>
              <div className="space-y-0.5">
                {STAFF_ITEMS.map((item) => (
                  <NavLink key={item.href} {...item} />
                ))}
              </div>
            </div>
          )}
        </nav>

        <div className="pt-4 border-t border-border mt-4">
          <div className="flex items-center justify-between px-2">
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{session?.user?.name}</div>
              <div className="text-xs text-text-lo font-mono">{role}</div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="text-xs text-danger hover:underline focus-ring px-2 py-1"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
