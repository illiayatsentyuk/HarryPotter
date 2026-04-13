import type { SpellRow, SpellStatus } from "../types/spell.type";

/** Case-insensitive substring match on `name` only. */
export function filterSpellsByName(rows: SpellRow[], query: string): SpellRow[] {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((s) => s.name.toLowerCase().includes(q));
}

/** Filter by status; "All" returns every row unchanged. */
export function filterSpellsByStatus(
  rows: SpellRow[],
  status: SpellStatus | "All",
): SpellRow[] {
  if (status === "All") return rows;
  return rows.filter((s) => s.status === status);
}
