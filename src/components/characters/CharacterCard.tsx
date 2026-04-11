import type { PotterCharacter } from "../../types/character.type";
import "./CharacterCard.css";

type CharacterCardProps = {
  character: PotterCharacter;
};

export default function CharacterCard({ character }: CharacterCardProps) {
  const { name, image } = character;
  const titleId = `character-name-${character.id}`;

  return (
    <article
      className="character-card"
      aria-labelledby={titleId}
    >
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
  );
}
