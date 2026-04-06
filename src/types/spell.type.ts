export type SpellStatus = "Approved" | "Forbidden";

export type SpellRow = {
  id: number;
  name: string;
  faculty: string;
  effects: string;
  status: SpellStatus;
};

export type SpellSortKey = keyof SpellRow;
export type SpellSortDir = "asc" | "desc";
export type SpellStatusFilter = "all" | SpellStatus;
