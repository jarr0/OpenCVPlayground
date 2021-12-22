import { useState } from "react";
import classes from "./SnippetViewSetup.module.css";

import data from "./snippetData/function_data.json";

import SnippetsLibrary from "./snippetLists/SnippetsLibrary";
import SnippetsSelected from "./snippetLists/SnippetsSelected";
import ImageView from "./imageView/ImageView";

function SnippetViewSetup() {
  const [selectedItems, addSelectedItem] = useState([]);

  const snippets = [];

  for (const key in data) {
    const snippet = { ...data[key] };
    snippets.push(snippet);
  }

  return (
    <div className={classes.setup}>
      <SnippetsLibrary data={data} />
      <SnippetsSelected data={data}/>
      <ImageView />
    </div>
  );
}

export default SnippetViewSetup;
