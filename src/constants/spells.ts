import type { SpellSortKey, SpellStatusFilter } from "../types/spell.type";

export const STATUS_FILTER_OPTIONS: {
  value: SpellStatusFilter;
  label: string;
}[] = [
  { value: "all", label: "All" },
  { value: "Approved", label: "Approved" },
  { value: "Forbidden", label: "Forbidden" },
];

export const SORT_COLUMNS: { key: SpellSortKey; label: string }[] = [
  { key: "id", label: "#" },
  { key: "name", label: "Name" },
  { key: "faculty", label: "Faculty" },
  { key: "effects", label: "Effects" },
  { key: "status", label: "Status" },
];
