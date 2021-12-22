import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        OpenCV<span>Playground</span>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Snippets</Link>
          </li>
          <li>
            <Link to="/coding">Coding</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
