import type { PotterCharacter } from "../types/character.type";

const POTTER_DB_BASE = "https://api.potterdb.com";

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
    };
  };
};

function parseCharacter(json: JsonApiCharacterResource): PotterCharacter {
  const { id, attributes } = json.data;
  return {
    id,
    name: attributes.name,
    image: attributes.image,
  };
}

export async function fetchPotterDbCharactersBySlugs(
  slugs: readonly string[],
  signal?: AbortSignal,
): Promise<PotterCharacter[]> {
  const results = await Promise.all(
    slugs.map(async (slug) => {
      const res = await fetch(`${POTTER_DB_BASE}/v1/characters/${slug}`, {
        signal,
      });
      if (!res.ok) {
        throw new Error(`Failed to load character (${res.status})`);
      }
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
