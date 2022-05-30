import { useState, useContext, useEffect } from "react";
import classes from "./SnippetViewSetup.module.css";
import SelectedContext from "../../../store/selected-context";

import data from "./snippetData/function_data.json";

import SnippetsLibrary from "./snippetLists/SnippetsLibrary";
import SnippetsSelected from "./snippetLists/SnippetsSelected";
import ImageView from "./imageView/ImageView";

function SnippetViewSetup() {
  const {prevSession} = useContext(SelectedContext)
  
  useEffect(() => {
    prevSession()
  }, [])

  const [selectedItems, addSelectedItem] = useState([]);

  const snippets = [];

  for (const key in data) {
    const snippet = { ...data[key] };
    snippets.push(snippet);
  }

  /* Sorts snippets case-insensitive */
  data.sort ( (a, b) => {
    a = a.func_name.toLowerCase()
    b = b.func_name.toLowerCase()

    return a < b ? -1 : a > b ? 1 : 0
  })

  return (
    <div className={classes.setup}>
      <SnippetsLibrary data={data} />
      <SnippetsSelected data={data} />
      <ImageView />
    </div>
  );
}

export default SnippetViewSetup;
