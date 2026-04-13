import type { PotterCharacter } from "../../types/character.type";
import "./CharacterCard.css";

type CharacterCardProps = {
  character: PotterCharacter;
};

type BackRowProps = {
  label: string;
  value: string | string[] | null | undefined;
};

function BackRow({ label, value }: BackRowProps) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  const display = Array.isArray(value) ? value.join(", ") : value;
  return (
    <div className="character-card__back-row">
      <span className="character-card__back-label">{label}</span>
      <span className="character-card__back-value">{display}</span>
    </div>
  );
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const { name, image, house, born, species, gender, bloodStatus, patronus, wands } = character;
  const titleId = `character-name-${character.id}`;

  return (
    <div className="character-card" aria-labelledby={titleId}>
      <div className="character-card__inner">

        {/* Front */}
        <article className="character-card__face character-card__face--front">
          <div className="character-card__media">
            {image ? (
              <img
                className="character-card__image"
                src={image}
                alt=""
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="character-card__placeholder" aria-hidden>
                No image
              </div>
            )}
          </div>
          <h2 id={titleId} className="character-card__name">
            {name}
          </h2>
        </article>

        {/* Back */}
        <article className="character-card__face character-card__face--back" aria-hidden>
          <p className="character-card__back-title">{name}</p>
          <div className="character-card__back-rows">
            <BackRow label="House"        value={house} />
            <BackRow label="Born"         value={born} />
            <BackRow label="Species"      value={species} />
            <BackRow label="Gender"       value={gender} />
            <BackRow label="Blood status" value={bloodStatus} />
            <BackRow label="Patronus"     value={patronus} />
            <BackRow label="Wand"         value={wands} />
          </div>
          <span className="character-card__back-rune" aria-hidden>✦</span>
        </article>

      </div>
    </div>
  );
}
