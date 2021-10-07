import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Routes from "../../../../constants/routes";
import TokenStore from "../../../../util/tokenStore";
import styles from "./navbar.module.scss";

interface Props {}

const routes = [
  { label: "Documents", url: Routes.DOCUMENTS },
  { label: "Kanban", url: Routes.KANBAN },
];

const Navbar = (props: Props) => {
  const { push } = useHistory();
  const { pathname } = useLocation();

  const logout: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault;
    TokenStore.logout();
    push(Routes.LOGIN);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.routes}>
        {routes.map((route) => (
          <Link
            key={route.url}
            to={route.url}
            className={`${styles.route} ${
              pathname.startsWith(route.url) ? styles.active : ""
            }`}
          >
            {route.label}
          </Link>
        ))}
      </div>
      <a href="#" onClick={logout} className={styles.logout}>
        Logout
      </a>
    </nav>
  );
};

export default Navbar;
