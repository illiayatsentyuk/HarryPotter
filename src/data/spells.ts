import type { SpellRow } from "../types/spell.type";

export const SPELLS: SpellRow[] = [
  {
    id: 1,
    name: "EXPELLIARMUS",
    faculty: "Gryffindor",
    effects:
      "The Disarming Charm. Requires pure courage for a swift, decisive strike to disarm an opponent.",
    status: "Approved",
  },
  {
    id: 2,
    name: "CRUCIO",
    faculty: "Slytherin",
    effects:
      "The Torture Curse. One of the Unforgivable Curses. Demands absolute will and dark ambition to inflict pain. Forbidden.",
    status: "Forbidden",
  },
  {
    id: 3,
    name: "LUMOS",
    faculty: "Ravenclaw",
    effects:
      "The Wand-Lighting Charm. Simple in form, but brilliant in execution. Represents the light of knowledge and clarity of a focused mind.",
    status: "Approved",
  },
  {
    id: 4,
    name: "HERBIVICUS",
    faculty: "Hufflepuff",
    effects:
      "The Growth Spell. Harnesses the power of earth and patience to rapidly mature plants and heal nature. A gentle, steady hand makes it flourish.",
    status: "Approved",
  },
];
