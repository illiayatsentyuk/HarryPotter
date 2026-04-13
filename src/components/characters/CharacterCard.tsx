import type { PotterCharacter } from "../../types/character.type";
import "./CharacterCard.css";

type CharacterCardProps = {
  character: PotterCharacter;
};

export default function CharacterCard({ character }: CharacterCardProps) {
  const { name, image } = character;
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
        <p className="character-card__back-title">Known for</p>
        <p className="character-card__back-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          vehicula sapien vel lorem faucibus, nec sodales risus laoreet.
          Phasellus tincidunt libero vitae eros gravida, sed pretium nisi
          bibendum.
        </p>
        <span className="character-card__back-rune" aria-hidden>✦</span>
      </article>
      </div>
    </div>
  );
}
