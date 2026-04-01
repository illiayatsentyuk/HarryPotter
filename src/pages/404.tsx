import { Link } from "react-router";
import "./404.css";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__panel">
        <div className="not-found__code">404</div>
        <h1 className="not-found__title">Page Not Found</h1>
        <p className="not-found__text">
          This corridor leads nowhere. Let’s return to the Great Hall.
        </p>
        <div className="not-found__actions">
          <Link className="not-found__link" to="/">
            Back to The Archive
          </Link>
        </div>
      </div>
    </section>
  );
}
