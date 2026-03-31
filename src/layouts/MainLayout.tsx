import { NavLink, Outlet } from "react-router";
import "./MainLayout.css";

export default function MainLayout() {
  const navItems = [
    { label: "The Archive", to: "/" },
    { label: "Faculties", to: "/faculties" },
    { label: "Characters", to: "/characters" },
    { label: "Cards", to: "/cards" },
  ];

  return (
    <>
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
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    isActive
                      ? "header__nav-link header__nav-link--active"
                      : "header__nav-link"
                  }
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
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <h1>Footer</h1>
      </footer>
    </>
  );
}
