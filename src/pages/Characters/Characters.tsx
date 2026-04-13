import { useEffect, useState } from "react";
import CharacterCard from "../../components/characters/CharacterCard";
import { fetchFeaturedPotterCharacters } from "../../api/potterDb";
import type { PotterCharacter } from "../../types/character.type";
import DeerImage from "../../assets/images/deer.jpg"
import "./Characters.css";

export default function Characters() {
  const [characters, setCharacters] = useState<PotterCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);
    fetchFeaturedPotterCharacters(ctrl.signal)
      .then(setCharacters)
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Failed to load characters");
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, []);

  return (
    <>
      <img className="characters__image" src={DeerImage} alt="" />
      <section className="characters">
        <h1 className="characters__title">9¾  THOUSAND OCCUMY MEMBERS INITIATED</h1>
        <div className="characters__divider" aria-hidden />

        <div className="characters__content">
          {loading ? (
            <p className="characters__state" role="status">
              Loading characters…
            </p>
          ) : error ? (
            <p className="characters__state characters__state--error" role="alert">
              {error}
            </p>
          ) : (
            <ul className="characters__grid" aria-label="Character cards">
              {characters.map((c) => (
                <li key={c.id} className="characters__item">
                  <CharacterCard character={c} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
