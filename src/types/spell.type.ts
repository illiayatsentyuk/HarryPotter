export type SpellStatus = "Approved" | "Forbidden";

export type SpellRow = {
  id: number;
  name: string;
  effects: string;
  status: SpellStatus;
};
