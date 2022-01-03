import { Snippet, SnippetHeader } from "./snippetComponents";
import classes from "./snippetComponents/Snippet.module.css";

import {
  SnippetDropdown,
  SnippetSlider,
  SnippetBoolean,
} from "./snippetComponents/selectedSnippetParts";

function SnippetSelectedItem(props) {
  const params = props.item.signature;

  const children = [];
  params.map((param) => {
    const part = param.var_type.split(":")[0];

    const argID = [props.item.selected_id, param.param_no].join('#')

    if (part === "dropdown") {
      children.push(SnippetDropdown({argID, ...param}));
    } else if (part === "int" || part === "float") {
      children.push(SnippetSlider(param));
    } else if (part === "bool") {
      children.push(SnippetBoolean(param));
    }
  });

  return (
    <Snippet className={classes.library_snippet}>
      <div className={classes.selected_snippet}>
        <SnippetHeader type="selected" item={props.item} />
        <div className={classes.snippet_vars}>{children}</div>
      </div>
    </Snippet>
  );
}

export default SnippetSelectedItem;
