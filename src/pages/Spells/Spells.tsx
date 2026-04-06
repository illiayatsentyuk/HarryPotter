import { useEffect, useMemo, useRef, useState } from "react";
import {
  IoArrowDown,
  IoArrowUp,
  IoFilter,
  IoSearch,
} from "react-icons/io5";
import { SORT_COLUMNS, STATUS_FILTER_OPTIONS } from "../../constants/spells";
import { SPELLS } from "../../data/spells";
import type {
  SpellSortDir,
  SpellSortKey,
  SpellStatusFilter,
} from "../../types/spell.type";
import {
  filterByStatus,
  filterSpells,
  sortSpells,
} from "../../utils/spells";
import "./Spells.css";

export default function Spells() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SpellSortKey>("id");
  const [sortDir, setSortDir] = useState<SpellSortDir>("asc");
  const [statusFilter, setStatusFilter] = useState<SpellStatusFilter>("all");
  const [popupOpen, setPopupOpen] = useState(false);

  const filterBtnRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    if (!popupOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        !filterBtnRef.current?.contains(e.target as Node) &&
        !popupRef.current?.contains(e.target as Node)
      ) {
        setPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [popupOpen]);

  const visibleRows = useMemo(() => {
    const byStatus = filterByStatus(SPELLS, statusFilter);
    const searched = filterSpells(byStatus, query);
    return sortSpells(searched, sortKey, sortDir);
  }, [query, sortKey, sortDir, statusFilter]);

  const handleSortKey = (key: SpellSortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const handleSortDir = (dir: SpellSortDir) => setSortDir(dir);

  const sortLabel = `${SORT_COLUMNS.find((c) => c.key === sortKey)?.label ?? ""} ${sortDir === "asc" ? "↑" : "↓"}`;
  const statusLabel =
    statusFilter === "all"
      ? "All statuses"
      : statusFilter === "Forbidden"
        ? "Forbidden only"
        : "Approved only";

  const filterSummary = `${statusLabel}; ${sortLabel}`;

  return (
    <section className="spells">
      <h1 className="spells__title">MAGICAL ARSENAL</h1>
      <div className="spells__divider" aria-hidden />

      <div className="spells__toolbar">
        <div className="spells__search">
          <IoSearch className="spells__search-icon" size={30} aria-hidden />
          <input
            className="spells__search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search spells…"
            aria-label="Search spells"
            autoComplete="off"
          />

          <div className="spells__filter-wrap">
            <button
              ref={filterBtnRef}
              type="button"
              className={`spells__filter-btn${popupOpen ? " spells__filter-btn--open" : ""}`}
              onClick={() => setPopupOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={popupOpen}
              aria-label={`Filter and sort. ${filterSummary}`}
              title={`${filterSummary}. Click to open.`}
            >
              <IoFilter size={22} aria-hidden />
            </button>

            {popupOpen && (
              <div
                ref={popupRef}
                className="spells__sort-popup"
                role="dialog"
                aria-label="Filter and sort options"
              >
                <p className="spells__sort-popup-label">Status</p>
                <ul className="spells__sort-keys" role="listbox" aria-label="Filter by spell status">
                  {STATUS_FILTER_OPTIONS.map(({ value, label }) => (
                    <li key={value}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={statusFilter === value}
                        className={`spells__sort-key-btn${statusFilter === value ? " spells__sort-key-btn--active" : ""}`}
                        onClick={() => setStatusFilter(value)}
                      >
                        <span>{label}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                <p className="spells__sort-popup-label spells__sort-popup-label--spaced">
                  Sort by
                </p>
                <ul className="spells__sort-keys" role="listbox">
                  {SORT_COLUMNS.map(({ key, label }) => (
                    <li key={key}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={sortKey === key}
                        className={`spells__sort-key-btn${sortKey === key ? " spells__sort-key-btn--active" : ""}`}
                        onClick={() => handleSortKey(key)}
                      >
                        <span>{label}</span>
                        {sortKey === key &&
                          (sortDir === "asc" ? (
                            <IoArrowUp size={14} aria-hidden />
                          ) : (
                            <IoArrowDown size={14} aria-hidden />
                          ))}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="spells__sort-dir" role="group" aria-label="Direction">
                  <button
                    type="button"
                    className={`spells__sort-dir-btn${sortDir === "asc" ? " spells__sort-dir-btn--active" : ""}`}
                    onClick={() => handleSortDir("asc")}
                  >
                    <IoArrowUp size={13} aria-hidden /> Asc
                  </button>
                  <button
                    type="button"
                    className={`spells__sort-dir-btn${sortDir === "desc" ? " spells__sort-dir-btn--active" : ""}`}
                    onClick={() => handleSortDir("desc")}
                  >
                    <IoArrowDown size={13} aria-hidden /> Desc
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="spells__table-wrap">
        <table className="spells__table" aria-label="Magical spells">
          <thead>
            <tr>
              {SORT_COLUMNS.map(({ key, label }) => (
                <th
                  key={key}
                  scope="col"
                  aria-sort={
                    sortKey === key
                      ? sortDir === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  <span className="spells__th-inner">
                    {label}
                    {sortKey === key && (
                      sortDir === "asc"
                        ? <IoArrowUp className="spells__sort-arrow" size={20} aria-hidden />
                        : <IoArrowDown className="spells__sort-arrow" size={20} aria-hidden />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.length === 0 ? (
              <tr>
                <td className="spells__empty" colSpan={5}>
                  No spells match your filters.
                </td>
              </tr>
            ) : (
              visibleRows.map((spell) => (
                <tr key={spell.id}>
                  <td>{spell.id}</td>
                  <td>{spell.name}</td>
                  <td>{spell.faculty}</td>
                  <td>{spell.effects}</td>
                  <td>{spell.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
