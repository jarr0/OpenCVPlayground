import { useState, useContext } from "react";
import SelectedContext from "../../../../../../store/selected-context";

import classes from "./Parts.module.css"

import {
  SnippetDropdown,
  SnippetSlider,
  SnippetBoolean,
  SnippetSizeOrPoint,
} from "./selectedSnippetParts";

parts = {
  "dropdown": SnippetDropdown,
  "int": SnippetSlider,
  "float": SnippetSlider,
  "Point": SnippetSizeOrPoint,
  "Size": SnippetSizeOrPoint,
};

function SelectedSnippetConstructor(props) {
  const selectedContext = useContext(SelectedContext)

  function paramterChange(argID, newValue) {
    selectedContext.changeParameter(argID, newValue)
  }

  return (
    <div className={classes.arg_setup}>
      <ul>
        <h3>{props.className}</h3>
      </ul>
    </div>
  )
}