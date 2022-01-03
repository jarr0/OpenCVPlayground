import { useContext } from "react";

import data from "../snippetData/function_data.json";
import classes from "./SnippetsList.module.css";

import SnippetSelectedItem from "../snippet/SnippetSelectedItem";

import SelectedContext from "../../../../store/selected-context";


function SnippetsSelected() {
  const selectedContext = useContext(SelectedContext);

  let content;

  const snippets = [];

  for (const key in data) {
    const snippet = { ...data[key] };
    snippets.push(snippet);
  }

  if (selectedContext.selected.length === 0) {
    content = <p>Nothing selected yet, add from library to get started...</p>;
  } else {
    content = (
      <div>
        <ul>
          {selectedContext.selected.map((item) => (
            <div>
              <SnippetSelectedItem item={item} />
            </div>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={classes.list_selected}>
      <div className={classes.list}>
        <h1>Selected</h1>
        <ul>
          {content}
          {/* {snippets.map((item) => (
            <div>
              <SnippetSelectedItem item={item} />
            </div>
          ))} */}
        </ul>
      </div>
    </div>
  );
}

export default SnippetsSelected;
