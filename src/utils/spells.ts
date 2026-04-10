import type { SpellRow } from "../types/spell.type";

/** Case-insensitive substring match on `name` only. */
export function filterSpellsByName(rows: SpellRow[], query: string): SpellRow[] {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((s) => s.name.toLowerCase().includes(q));
}
