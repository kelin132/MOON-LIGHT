export const STAFF_ROLES = ['True Owner', 'Owner', 'Mod', 'Staff'] as const;
export type Role = (typeof STAFF_ROLES)[number] | 'Member';

export function isStaff(role?: string | null): boolean {
  if (!role) return false;
  return (STAFF_ROLES as readonly string[]).includes(role);
}
