import { NavLink, Outlet, useLocation } from "react-router";
import "./MainLayout.css";
import footerLogo from "../assets/images/footer-logo.png";

export default function MainLayout() {
  const { pathname } = useLocation();

  const navItems = [
    { label: "The Archive", to: "/" },
    { label: "Faculties", to: "/faculties" },
    { label: "Characters", to: "/characters" },
    { label: "Spells", to: "/spells" },
  ];

  return (
    <div className="main-layout">
      <header className="header">
        <img
          src="/src/assets/images/header-logo.png"
          className="header__logo"
          alt="Harry Potter"
        />
        <nav className="header__nav">
          <ul className="header__nav-list">
            {navItems.map((item) => (
              <li key={item.to} className="header__nav-item">
                <NavLink
                  to={item.to}
                  end={item.to === "/" || item.to === "/faculties"}
                  className={({ isActive }) => {
                    const isFacultySectionActive =
                      item.to === "/faculties" &&
                      pathname.startsWith("/faculty");
                    const isArchiveSectionActive =
                      item.to === "/" &&
                      (pathname === "/" ||
                        pathname === "/quiz" ||
                        pathname === "/quiz-result");
                    const active =
                      isActive ||
                      isFacultySectionActive ||
                      isArchiveSectionActive;
                    return active
                      ? "header__nav-link header__nav-link--active"
                      : "header__nav-link";
                  }}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header__actions">
          <button className="header__action-button" type="button">
            <img
              src="/src/assets/icons/search.svg"
              className="header__action-icon"
              alt="Search"
            />
          </button>
          <button className="header__action-button" type="button">
            <img
              src="/src/assets/icons/user.svg"
              className="header__action-icon"
              alt="User"
            />
          </button>
        </div>
      </header>
      <main className="main-layout__content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer__top">
          <img
            className="footer__logo"
            src={footerLogo}
            alt="Harry Potter FunClub"
          />
          <nav className="footer__nav" aria-label="Footer">
            <a className="footer__link" href="#">
              Member Codex
            </a>
            <a className="footer__link" href="#">
              Contact
            </a>
          </nav>
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">
            © 2026 Potter FunClub. All rights reserved. Unauthorised
            reproduction is subject to harassment via OwlMail.
          </p>
        </div>
      </footer>
    </div>
  );
}
