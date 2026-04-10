export type SpellStatus = "Approved" | "Forbidden";

export type SpellRow = {
  id: number;
  name: string;
  faculty: string;
  effects: string;
  status: SpellStatus;
};
