export const RARITY_STYLES: Record<string, string> = {
  Common: 'text-text-lo border-border',
  Rare: 'text-sky-300 border-sky-400/30',
  Epic: 'text-moonviolet-light border-moonviolet/40',
  Legendary: 'text-moongold border-moongold/40',
  Mythic: 'text-danger border-danger/40',
};

export function rarityStyle(rarity?: string) {
  return RARITY_STYLES[rarity || 'Common'] || RARITY_STYLES.Common;
}
