import { useContext, useState } from "react";
import SelectedContext from "../../../../../../store/selected-context";

import classes from "./Parts.module.css";

function SnippetSizeOrPoint(props) {
  const selectedContext = useContext(SelectedContext);

  function inputHandler(e) {
    if (e.target.value != '') {
      let newValue = '(' + e.target.value + ',' + e.target.value + ')'
      selectedContext.changeParameter(props.argID, newValue)
    }
    console.log("pressed");
  }

  return (
    <div className={classes.arg_setup}>
      <div className={classes.size_or_point}>
        <ul>
          <li>
            <h3>{props.param_name}</h3>
          </li>
          <li>
            <ul>
              <li>
                <h3>{props.var_type}(</h3>
              </li>
              <li>
                <input type="number" name="" id="" onKeyUp={inputHandler} defaultValue='1'/>
              </li>
              <li>
                <h3>,</h3>
              </li>
              <li>
                <input type="number" name="" id="" disabled={true} />
              </li>
              <li>
                <h3>)</h3>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SnippetSizeOrPoint;
