import type {
  SpellRow,
  SpellSortDir,
  SpellSortKey,
  SpellStatusFilter,
} from "../types/spell.type";

export function filterByStatus(
  rows: SpellRow[],
  status: SpellStatusFilter,
): SpellRow[] {
  if (status === "all") return rows;
  return rows.filter((s) => s.status === status);
}

export function filterSpells(rows: SpellRow[], query: string): SpellRow[] {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter(
    (s) =>
      String(s.id).includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.faculty.toLowerCase().includes(q) ||
      s.effects.toLowerCase().includes(q) ||
      s.status.toLowerCase().includes(q),
  );
}

export function sortSpells(
  rows: SpellRow[],
  key: SpellSortKey,
  dir: SpellSortDir,
): SpellRow[] {
  const out = [...rows];
  const m = dir === "asc" ? 1 : -1;
  out.sort((a, b) => {
    if (key === "id") return (a.id - b.id) * m;
    return (
      String(a[key]).localeCompare(String(b[key]), undefined, {
        sensitivity: "base",
      }) * m
    );
  });
  return out;
}
