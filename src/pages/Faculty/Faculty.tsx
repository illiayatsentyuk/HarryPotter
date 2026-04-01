import "./Faculty.css";
import { Link, Navigate, useParams } from "react-router";
import { EFaculty } from "../../enums/Faculties.enum";

export default function Faculty() {
  const faculties = [
    {
      id: 1,
      title: "THE GRYFFINDOR COMMON ROOM",
      name: EFaculty.GRYFFINDOR,
      motto:
        "Welcome, newcomers, to the realm of the brave-hearted. Courage, chivalry and resolve guide our path. Step into the light.",
      logo: `/src/assets/images/faculty/${EFaculty.GRYFFINDOR}/${EFaculty.GRYFFINDOR}-logo.png`,
      background: `/src/assets/images/faculty/${EFaculty.GRYFFINDOR}/${EFaculty.GRYFFINDOR}-background.png`,
      relic: `/src/assets/images/faculty/${EFaculty.GRYFFINDOR}/${EFaculty.GRYFFINDOR}-relic.png`,
      relicTitle: "Godric Gryffindor’s Sword (The Goblin-Made Masterpiece)",
      relicDescription:
        "This sword appears only when a true Gryffindor is in danger and shows true courage. Forged by goblins, it absorbs only that which makes it stronger — such as basilisk venom. It is not merely a weapon; it is a symbol of our spirit.",
      news: [
        {
          id: 1,
          title: "THE TRIWIZARD TRIALS",
          description:
            "Our players are already training on the Quidditch pitch. Come along and cheer them on – let’s make some proper noise!",
        },
        {
          id: 2,
          title: "QWIDDITCH CUP UPDATE",
          description:
            "The next match is against Slytherin. The team captain will be waiting for everyone in the common room at 7 pm for a tactical debrief.",
        },
      ],
    },
    {
      id: 2,
      title: "THE SLYTHERIN COMMON ROOM",
      motto:
        "Welcome, ambitious student. You have entered the vaults. Ambition, Cunning, and Pride define our line.",
      name: EFaculty.SLYTHERIN,
      logo: `/src/assets/images/faculty/${EFaculty.SLYTHERIN}/${EFaculty.SLYTHERIN}-logo.png`,
      background: `/src/assets/images/faculty/${EFaculty.SLYTHERIN}/${EFaculty.SLYTHERIN}-background.png`,
      relic: `/src/assets/images/faculty/${EFaculty.SLYTHERIN}/${EFaculty.SLYTHERIN}-relic.png`,
      relicTitle: "Salazar Slytherin’s Locket (Replica of the Lost Horcrux)",
      relicDescription: `This medallion was seized from a private auction in London just a few hours before it was due to begin. According to our sources, the original belonged to Salazar Slytherin and became a symbol not only of ambition but also of unwavering will. Our masters have cleansed the artefact of any residual dark energy. It is now safe for study within Slytherin’s Common Room.`,
      news: [
        {
          id: 1,
          title: "FORBIDDEN POTIONS UPDATES",
          description:
            "Professor Snape (archival records) has updated the Veritaserum formula. Components have been added to stabilise the effect under pressure.",
        },
        {
          id: 2,
          title: "THE HIERARCHY SHIFT",
          description:
            "The faculty influence rankings have been updated. Slytherin is once again leading the ‘Artifact Collection’ category.",
        },
      ],
    },
    {
      id: 3,
      title: "THE HUFFLEPUFF COMMON ROOM",
      motto:
        "Where they are just and loyal. Those patient Hufflepuffs are true and unafraid of toil. Welcome home.",
      name: EFaculty.HUFFLEPUFF,
      logo: `/src/assets/images/faculty/${EFaculty.HUFFLEPUFF}/${EFaculty.HUFFLEPUFF}-logo.png`,
      background: `/src/assets/images/faculty/${EFaculty.HUFFLEPUFF}/${EFaculty.HUFFLEPUFF}-background.png`,
      relic: `/src/assets/images/faculty/${EFaculty.HUFFLEPUFF}/${EFaculty.HUFFLEPUFF}-relic.png`,
      relicTitle: "Helga Hufflepuff’s Cup",
      relicDescription:
        "A golden bowl with two handles and an engraved badger. It symbolises hospitality and generosity. It is said that the drinks in this bowl never run out if you drink them with a kind heart.",
      news: [
        {
          id: 1,
          title: "THE MANDRAKE HARVEST",
          description:
            "A record harvest of mandrakes has been gathered in Greenhouse No. 3. Be careful — they’re particularly loud today. Volunteers are needed to help with the transplanting.",
        },
        {
          id: 2,
          title: "THE KINDNESS INITIATIVE",
          description:
            "We are collecting warm clothes for those affected by the cold snap in the Forbidden Forest. Every contribution counts.",
        },
      ],
    },
    {
      id: 4,
      title: "THE RAVENCLAW COMMON ROOM",
      motto:
        "An incomparable mind is a person’s greatest treasure. The stars are our guide, and knowledge is our strength. Welcome to the team.",
      name: EFaculty.RAVENCLAW,
      logo: `/src/assets/images/faculty/${EFaculty.RAVENCLAW}/${EFaculty.RAVENCLAW}-logo.png`,
      background: `/src/assets/images/faculty/${EFaculty.RAVENCLAW}/${EFaculty.RAVENCLAW}-background.png`,
      relic: `/src/assets/images/faculty/${EFaculty.RAVENCLAW}/${EFaculty.RAVENCLAW}-relic.png`,
      relicTitle: "Rowena Ravenclaw’s Diadem (Restored Fragment)",
      relicDescription:
        "A tiara that bestows wisdom upon all who wear it. It was lost for centuries, but the memory of it has always lived on within these walls. We are studying its structure to understand how knowledge is transformed into power.",
      news: [
        {
          id: 1,
          title: "THE MIDNIGHT STARGAZING",
          description:
            "Today, Jupiter will enter the constellation of Sagittarius. It’s the perfect time for prophecies and for calibrating telescopes in the North Tower.",
        },
        {
          id: 2,
          title: "ANCIENT RUNES DECODED",
          description:
            "Our students have deciphered the message on the wall on the 7th floor. It turns out it was a recipe for the perfect cup of tea to help you concentrate.",
        },
      ],
    },
  ];
  const { name } = useParams();
  const normalizedName = name?.trim().toLowerCase();
  const isValidFaculty =
    typeof normalizedName === "string" &&
    Object.values(EFaculty).includes(normalizedName as EFaculty);

  if (!isValidFaculty) {
    return <Navigate to="/faculties" replace />;
  }

  const faculty = faculties.find((f) => f.name === normalizedName);

  if (!faculty) {
    return <Navigate to="/faculties" replace />;
  }

  return (
    <section
      className={`faculty`}
      style={{ backgroundImage: `url(${faculty.background})` }}
    >
      <div className="faculty__overlay">
        <h1 className="faculty__title">{faculty.title}</h1>

        <div className={`faculty__panel faculty__panel--${normalizedName}`}>
          <Link className="faculty__change" to="/faculties">
            CHANGE FACULTY
          </Link>

          <div className="faculty__intro">
            <img
              className="faculty__crest"
              src={faculty.logo}
              alt={faculty.name}
            />
            <p className="faculty__motto">{faculty.motto}</p>
          </div>

          <div className="faculty__grid">
            <article className="faculty__card faculty__card--relic">
              <h2 className="faculty__card-title">{faculty.relicTitle}</h2>
              <div className="faculty__relic-media">
                <img
                  className="faculty__relic-image"
                  src={faculty.relic}
                  alt={faculty.relicTitle}
                />
              </div>
              <p className="faculty__card-text">{faculty.relicDescription}</p>
            </article>

            <div className="faculty__news">
              {faculty.news.slice(0, 2).map((item, idx, arr) => (
                <div key={item.id} className="faculty__news-item">
                  <h2 className="faculty__news-title">{item.title}</h2>
                  <p className="faculty__news-text">{item.description}</p>
                  {idx < arr.length - 1 && (
                    <hr className="faculty__news-divider" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
