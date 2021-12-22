import { createContext, useState } from "react";

import data from "../components/layout/snippetPage/snippetData/function_data.json"

const SelectedContext = createContext({
  selected: [],
  addSelected: (selectedID) => {},
});

export function SelectedContextProvider(props) {
  const [selectedSnippets, setSelectedSnippets] = useState([]);

  function addSelectedHandler(selectedID) {
    const count = selectedSnippets.filter((nextItem) => {
      return nextItem.id === selectedID
    }).length

    const new_id = `${selectedID}_${count}`
    var snippet_def 
    for (const key in data) {
      if (data[key].id === selectedID) {
        snippet_def = {
          id: data[key].id,
          selected_id: new_id,
          func_name: data[key].func_name,
          function: data[key].function,
          signature: data[key].signature,
        }
      }
    }

    setSelectedSnippets((prevSelectedSnippets) => {
      return prevSelectedSnippets.concat(snippet_def);
    });
  }

  function removeSelected(selectedID) {}

  const context = {
    selected: selectedSnippets,
    addSelected: addSelectedHandler,
  };

  return (
    <SelectedContext.Provider value={context}>
      {props.children}
    </SelectedContext.Provider>
  );
}

export default SelectedContext
