import { useState, useContext } from "react";
import Select from "react-select"

import classes from "./Parts.module.css";

import enums from "./../../../snippetData/enum_data.json";

import SelectedContext from "../../../../../../store/selected-context";

function SnippetDropdown(props) {
  const [selectedValue, setSelectedValue] = useState(1);
  const selectedContext = useContext(SelectedContext);

  const dropdownOptions = [];

  for (const key in enums) {
    if (enums[key].name === props.enum_name) {
      let found = { ...enums[key].enums };

      for (const enum_key in found) {
        dropdownOptions.push({ ...found[enum_key] });
      }
    }
  }

  // 
  const options = dropdownOptions.map((item) => {
    return {
      value: item.code,
      label: item.name,
    }
  })

  function setParameterValue(e) {
    selectedContext.changeParameter(props.argID, e.target.value)
  }

  return (
    <div className={classes.arg_setup}>
      <div className={classes.dropdown}>
        <ul>
          <li>
            <h3>{props.param_name}</h3>
          </li>
          <li>
            {/* <Select options={options} styles={customStyles}/> */}
            <select name="arg_1" id="arg_1" onChange={setParameterValue}>
              {dropdownOptions.map((item) => (
                <option value={item.code}>{item.name}</option>
              ))}
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SnippetDropdown;
