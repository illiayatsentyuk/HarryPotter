import { useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { fetchHpApiSpells } from "../../api/hpSpells";
import type { SpellRow } from "../../types/spell.type";
import { filterSpellsByName } from "../../utils/spells";
import "./Spells.css";

const TABLE_HEADERS = ["#", "Name", "Faculty", "Effects", "Status"] as const;

export default function Spells() {
  const [rows, setRows] = useState<SpellRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");

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

  const visibleRows = useMemo(
    () => filterSpellsByName(rows, query),
    [query, rows],
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
      </div>

      <div className="spells__table-wrap">
        <table className="spells__table" aria-label="Magical spells">
          <thead>
            <tr>
              {TABLE_HEADERS.map((label) => (
                <th key={label} scope="col">
                  <span className="spells__th-inner">{label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="spells__empty" colSpan={5}>
                  Loading spells…
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td className="spells__empty" colSpan={5}>
                  {error}
                </td>
              </tr>
            ) : visibleRows.length === 0 ? (
              <tr>
                <td className="spells__empty" colSpan={5}>
                  No spells match that name.
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
