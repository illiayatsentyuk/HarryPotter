import type { SpellRow } from "../types/spell.type";

type HpApiSpell = {
  id: string;
  name: string;
  description: string;
};

const HP_API_BASE_URL = "https://hp-api.onrender.com";

const UNFORGIVABLE = new Set([
  "Avada Kedavra",
  "Crucio",
  "Imperio",
]);

function toSpellRow(spell: HpApiSpell, index: number): SpellRow {
  return {
    id: index + 1,
    name: spell.name,
    faculty: "—",
    effects: spell.description,
    status: UNFORGIVABLE.has(spell.name) ? "Forbidden" : "Approved",
  };
}

export async function fetchHpApiSpells(
  signal?: AbortSignal,
): Promise<SpellRow[]> {
  const res = await fetch(`${HP_API_BASE_URL}/api/spells`, { signal });
  if (!res.ok) {
    throw new Error(`Failed to load spells (${res.status})`);
  }
  const data = (await res.json()) as HpApiSpell[];
  return data.map((s, idx) => toSpellRow(s, idx));
}
