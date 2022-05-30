import { Snippet, SnippetHeader } from "./snippetComponents";
import classes from "./snippetComponents/Snippet.module.css";

import {
  SnippetDropdown,
  SnippetSlider,
  SnippetBoolean,
  SnippetSizeOrPoint,
} from "./snippetComponents/selectedSnippetParts";

// parts = {
//   "dropdown": SnippetDropdown,
//   "int": SnippetSlider,
//   "float": SnippetSlider,
//   "Point": SnippetSizeOrPoint,
//   "Size": SnippetSizeOrPoint,
// };

function SnippetSelectedItem(props) {
  const params = props.item.signature;

  const children = [];
  params.map((param) => {
    const part = param.var_type.split(":")[0];

    const argID = [props.item.selected_id, param.param_no].join("#");

    const childParams = { argID, ...param };

    if (part === "dropdown") {
      children.push(SnippetDropdown(childParams));
    } else if (part === "int" || part === "double") {
      children.push(SnippetSlider(childParams));
    } else if (part === "bool") {
      children.push(SnippetBoolean(childParams));
    } else if (part === "Point" || part === "Size") {
      children.push(SnippetSizeOrPoint(childParams));
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
