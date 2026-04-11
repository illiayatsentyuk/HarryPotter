import type { SpellRow } from "../types/spell.type";

type HpApiSpell = {
  id: string;
  name: string;
  description: string;
};

const HP_API_BASE_URL = "https://hp-api.onrender.com";
const SPELLS_URL = `${HP_API_BASE_URL}/api/spells`;
const CACHE_NAME = "hp-spells-cache";

const UNFORGIVABLE = new Set([
  "Avada Kedavra",
  "Crucio",
  "Imperio",
]);

function toSpellRow(spell: HpApiSpell, index: number): SpellRow {
  return {
    id: index + 1,
    name: spell.name,
    effects: spell.description,
    status: UNFORGIVABLE.has(spell.name) ? "Forbidden" : "Approved",
  };
}

export async function fetchHpApiSpells(
  signal?: AbortSignal,
): Promise<SpellRow[]> {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(SPELLS_URL);
  if (cached) {
    const data = (await cached.json()) as HpApiSpell[];
    return data.map((s, idx) => toSpellRow(s, idx));
  }

  const res = await fetch(SPELLS_URL, { signal });
  if (!res.ok) {
    throw new Error(`Failed to load spells (${res.status})`);
  }

  await cache.put(SPELLS_URL, res.clone());
  const data = (await res.json()) as HpApiSpell[];
  return data.map((s, idx) => toSpellRow(s, idx));
}
