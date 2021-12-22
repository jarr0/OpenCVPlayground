import { Snippet, SnippetHeader, SnippetDesc } from "./snippetComponents";
import classes from "./snippetComponents/Snippet.module.css";

function SnippetLibraryItem(props) {
  return (
    <Snippet className={classes.library_snippet}>
      <div className={classes.library_snippet} >
        <SnippetHeader type="library" clicked={props.clicked} item={props.item} />
        <SnippetDesc item={props.item} />
      </div>
    </Snippet>
  );
}

export default SnippetLibraryItem;
