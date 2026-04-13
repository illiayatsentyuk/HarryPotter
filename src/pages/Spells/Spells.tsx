import { useEffect, useMemo, useRef, useState } from "react";
import { IoFunnel, IoSearch } from "react-icons/io5";
import { fetchHpApiSpells } from "../../api/hpSpells";
import type { SpellRow, SpellStatus } from "../../types/spell.type";
import { filterSpellsByName, filterSpellsByStatus } from "../../utils/spells";
import "./Spells.css";

type StatusFilter = SpellStatus | "All";

const STATUS_OPTIONS: StatusFilter[] = ["All", "Approved", "Forbidden"];

export default function Spells() {
  const [rows, setRows] = useState<SpellRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);
    fetchHpApiSpells(ctrl.signal)
      .then((data) => setRows(data))
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Failed to load spells");
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const visibleRows = useMemo(
    () => filterSpellsByStatus(filterSpellsByName(rows, query), statusFilter),
    [query, rows, statusFilter],
  );

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
            placeholder="Search by name…"
            aria-label="Search spells by name"
            autoComplete="off"
          />
        </div>

        <div className="spells__filter" ref={dropdownRef}>
          <button
            className={`spells__filter-btn${statusFilter !== "All" ? " spells__filter-btn--active" : ""}`}
            onClick={() => setDropdownOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            aria-label="Filter by status"
            title="Filter by status"
          >
            <IoFunnel size={18} aria-hidden />
            {statusFilter !== "All" && (
              <span className="spells__filter-label">{statusFilter}</span>
            )}
          </button>

          {dropdownOpen && (
            <ul className="spells__filter-dropdown" role="listbox" aria-label="Filter options">
              {STATUS_OPTIONS.map((opt) => (
                <li
                  key={opt}
                  role="option"
                  aria-selected={statusFilter === opt}
                  className={`spells__filter-option${statusFilter === opt ? " spells__filter-option--selected" : ""}${opt === "Forbidden" ? " spells__filter-option--forbidden" : ""}${opt === "Approved" ? " spells__filter-option--approved" : ""}`}
                  onClick={() => {
                    setStatusFilter(opt);
                    setDropdownOpen(false);
                  }}
                >
                  {opt}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="spells__content">
        {loading ? (
          <p className="spells__state" role="status">
            Loading spells…
          </p>
        ) : error ? (
          <p className="spells__state spells__state--error" role="alert">
            {error}
          </p>
        ) : visibleRows.length === 0 ? (
          <p className="spells__state">No spells match your filters.</p>
        ) : (
          <ul className="spells__list" aria-label="Spell list">
            {visibleRows.map((spell) => (
              <li key={spell.id} className="spells__row">
                <span className="spells__row-index" aria-hidden>
                  #{spell.id}
                </span>
                <span className="spells__row-name">{spell.name}</span>
                <span
                  className={`spells__card-badge${spell.status === "Forbidden" ? " spells__card-badge--forbidden" : ""}`}
                >
                  {spell.status}
                </span>
                <span className="spells__row-effects">{spell.effects}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
