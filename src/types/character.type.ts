/** Character row for UI (from Potter DB JSON:API). */
export type PotterCharacter = {
  id: string;
  name: string;
  image: string | null;
  house: string | null;
  born: string | null;
  species: string | null;
  gender: string | null;
  bloodStatus: string | null;
  patronus: string | null;
  wands: string[] | null;
};
