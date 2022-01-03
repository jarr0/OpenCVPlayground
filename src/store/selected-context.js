import { createContext, useState } from "react";

import data from "../components/layout/snippetPage/snippetData/function_data.json";

const SelectedContext = createContext({
  selected: [],
  addSelected: (selectedID) => {},
  removeSelected: (selectedID) => {},
  changeParameter: (parameterID, newValue) => {},
});

export function SelectedContextProvider(props) {
  const [selectedSnippets, setSelectedSnippets] = useState([]);

  function addSelectedHandler(selectedID) {
    const count = selectedSnippets.filter((nextItem) => {
      return nextItem.id === selectedID;
    }).length;

    const new_id = `${selectedID}_${count}`;

    const funcDef = data.find((item) => item.id === selectedID);
    const funcSignature = funcDef.signature;
    const funcSignatureWithValue = funcSignature.map((item) => {
      return {
        ...item,
        value: 0
      }
    });

    const snippetDef = {
      id: funcDef.id,
      selected_id: new_id,
      func_name: funcDef.func_name,
      function: funcDef.function,
      signature: funcSignatureWithValue,
    };

    setSelectedSnippets((prevSelectedSnippets) => {
      return prevSelectedSnippets.concat(snippetDef);
    });
  }

  function removeSelected(selectedID) {}

  function changeParameter(paramterID, newValue) {
    const funcID = paramterID.split("#")[0];
    const paramNo = paramterID.split("#")[1];

    console.log("funcID", funcID);
    console.log("paramNo", paramNo);

    const foundSnippet = selectedSnippets.find(
      (item) => item.selected_id === funcID
    );

    const curSelectedSnippets = selectedSnippets

    curSelectedSnippets.forEach((item, index) => {
      if (item.selected_id === funcID) {
        item.signature[parseInt(paramNo)].value = newValue
      }
    }) 

    console.log(curSelectedSnippets);
  }

  const context = {
    selected: selectedSnippets,
    addSelected: addSelectedHandler,
    removeSelected: removeSelected,
    changeParameter: changeParameter,
  };

  return (
    <SelectedContext.Provider value={context}>
      {props.children}
    </SelectedContext.Provider>
  );
}

export default SelectedContext;
