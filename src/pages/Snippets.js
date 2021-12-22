import classes from "./Snippets.module.css";

import SnippetsLibrary from "../components/layout/snippetPage/snippetLists/SnippetsLibrary";
import SnippetViewSetup from "../components/layout/snippetPage/SnippetViewSetup";

function Snippets() {
  return (
    <div>
      <h1 className={classes.title}>Snippets</h1>
      <p className={classes.description}>
        Add snippets from the library to manipulate your image
      </p>
      <div className={classes.main}>
        <SnippetViewSetup />
      </div>
    </div>
  );
}

export default Snippets;
