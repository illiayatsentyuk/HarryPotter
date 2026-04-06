import { Link } from "react-router";
import { homeCupImage, homeHeroImage } from "../../assets/images/home";
import "./Home.css";

export default function Home() {
  return (
    <section className="home">
      <div className="home__hero">
        <div className="home__hero-content">
          <h1 className="home__hero-title">
            <span className="home__hero-title-line home__hero-title-line--bright">
              THE UNSPOKEN{" "}
            </span>
            <span className="home__hero-title-line home__hero-title-line--muted">
              MAGIC
            </span>
          </h1>
          <p className="home__hero-description">
            For those who are still waiting for their letter, but have already
            learnt to read between the lines. Your ticket to a time loop, lost
            artefacts and a community where magic isn’t a trick, but a way of
            life.
          </p>
          <Link className="home__hero-cta" to="/quiz">
            SORT ME
          </Link>
        </div>
        <div className="home__hero-visual">
          <img className="home__hero-img" src={homeHeroImage} alt="" />
        </div>
      </div>

      <div className="home__devider">
        <p className="home__devider-text">
          9¾ THOUSAND OCCUMY MEMBERS INITIATED
        </p>
        <hr className="home__devider-line" />
      </div>

      <div className="home__news">
        <h2 className="home__news-heading">THE DAILY PROPHET</h2>

        <div className="home__news-grid">
          <article className="home__card home__card--feature">
            <h3 className="home__card-title">
              TRIWIZARD TOURNAMENT: 100 YEARS LATER
            </h3>
            <div className="home__card-media">
              <img src={homeCupImage} alt="" />
            </div>
            <p className="home__card-text">
              A look back at the darkest moments in the tournament’s history.
              Are we ready for the next challenge?
            </p>
          </article>

          <article className="home__card home__card--decrees">
            <div className="home__decrees-block">
              <h3 className="home__card-title">MINISTERIAL DECREE #142</h3>
              <p className="home__card-text">
                The use of memory spells in public places is now strictly
                regulated.
              </p>
            </div>
            <div className="home__decrees-block">
              <h3 className="home__card-title">HOUSE CUP</h3>
              <p className="home__card-text">
                Current standings: Slytherin leads by 2 points. Catch up!
              </p>
            </div>
            <div className="home__decrees-block">
              <h3 className="home__card-title">WINNER!</h3>
              <p className="home__card-text">
                Hufflepuff won the monthly quiz.
              </p>
            </div>
          </article>

          <div className="home__news-col">
            <article className="home__card home__card--compact">
              <h3 className="home__card-title">NEW CARDS!</h3>
              <p className="home__card-text">
                New cards are now available. Collect them all.
              </p>
            </article>
            <article className="home__card home__card--compact">
              <h3 className="home__card-title">FILTERING HAS BEEN ADDED.</h3>
              <p className="home__card-text">
                You can now filter information by faculty.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
