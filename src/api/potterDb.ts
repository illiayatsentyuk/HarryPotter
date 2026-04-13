import type { PotterCharacter } from "../types/character.type";

const POTTER_DB_BASE = "https://api.potterdb.com";
const CACHE_NAME = "potter-db-cache";

/** Slugs for `/v1/characters/{slug}` — see https://docs.potterdb.com/apis/rest */
export const FEATURED_CHARACTER_SLUGS = [
  "harry-potter",
  "hermione-granger",
  "ronald-weasley",
  "albus-dumbledore",
  "severus-snape",
  "minerva-mcgonagall",
  "draco-malfoy",
  "luna-lovegood",
  "neville-longbottom",
  "sirius-black",
] as const;

type JsonApiCharacterResource = {
  data: {
    id: string;
    type: string;
    attributes: {
      name: string;
      image: string | null;
      house: string | null;
      born: string | null;
      species: string | null;
      gender: string | null;
      blood_status: string | null;
      patronus: string | null;
      wands: string[] | null;
    };
  };
};

function parseCharacter(json: JsonApiCharacterResource): PotterCharacter {
  const { id, attributes } = json.data;
  return {
    id,
    name: attributes.name,
    image: attributes.image,
    house: attributes.house,
    born: attributes.born,
    species: attributes.species,
    gender: attributes.gender,
    bloodStatus: attributes.blood_status,
    patronus: attributes.patronus,
    wands: attributes.wands,
  };
}

export async function fetchPotterDbCharactersBySlugs(
  slugs: readonly string[],
  signal?: AbortSignal,
): Promise<PotterCharacter[]> {
  const cache = await caches.open(CACHE_NAME);

  const results = await Promise.all(
    slugs.map(async (slug) => {
      const url = `${POTTER_DB_BASE}/v1/characters/${slug}`;
      const cached = await cache.match(url);
      if (cached) {
        const json = (await cached.json()) as JsonApiCharacterResource;
        return parseCharacter(json);
      }

      const res = await fetch(url, { signal });
      if (!res.ok) {
        throw new Error(`Failed to load character (${res.status})`);
      }

      await cache.put(url, res.clone());
      const json = (await res.json()) as JsonApiCharacterResource;
      return parseCharacter(json);
    }),
  );
  return results;
}

export function fetchFeaturedPotterCharacters(
  signal?: AbortSignal,
): Promise<PotterCharacter[]> {
  return fetchPotterDbCharactersBySlugs(FEATURED_CHARACTER_SLUGS, signal);
}
