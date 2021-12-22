import classes from "./Snippet.module.css";

import SnippetHeader from "./SnippetHeader";
import SnippetSlider from "./SnippetSlider";

function Snippet(props) {
  return (
    <li id={props} > 
      <div className={classes.snippet}>
        {props.children}
      </div>
    </li>
  );
}

export default Snippet;
