import { useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { fetchHpApiSpells } from "../../api/hpSpells";
import type { SpellRow } from "../../types/spell.type";
import { filterSpellsByName } from "../../utils/spells";
import "./Spells.css";

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
          <p className="spells__state">No spells match that name.</p>
        ) : (
          <ul className="spells__grid" aria-label="Spell cards">
            {visibleRows.map((spell) => (
              <li key={spell.id}>
                <article
                  className="spells__card"
                  aria-labelledby={`spell-title-${spell.id}`}
                >
                  <div className="spells__card-top">
                    <span className="spells__card-index" aria-hidden>
                      #{spell.id}
                    </span>
                    <span
                      className={`spells__card-badge${spell.status === "Forbidden" ? " spells__card-badge--forbidden" : ""}`}
                    >
                      {spell.status}
                    </span>
                  </div>
                  <h2
                    id={`spell-title-${spell.id}`}
                    className="spells__card-title"
                  >
                    {spell.name}
                  </h2>
                  <div className="spells__card-body">
                    <p className="spells__card-effects-label">Effects</p>
                    <p className="spells__card-effects">{spell.effects}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
