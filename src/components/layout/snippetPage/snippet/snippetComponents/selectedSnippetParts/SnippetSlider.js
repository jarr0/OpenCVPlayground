import { useState } from "react";

import classes from "./Parts.module.css";

function SnippetSlider(props) {
  const [selectedValue, setSelectedValue] = useState(1);
  const [controlValues, setControlValues] = useState({
    min: 0,
    max: 100,
    step: 0.1,
  });

  function controlsOnChange(e) {
    const prevControlValues = controlValues
    prevControlValues[e.target.name] = e.target.value
    setControlValues(prevControlValues)
  }

  return (
    <div className={classes.arg_setup}>
      <div className={classes.slider}>
        <div className={classes.slider_header}>
          <ul>
            <li>
              <h3>{props.param_name}</h3>
            </li>
            <li>
              <h3>{selectedValue}</h3>
            </li>
          </ul>
        </div>
        <div className={classes.slider_footer}>
          <ul>
            <li>
              <input type="number" name="min" defaultValue={controlValues.min} onChange={controlsOnChange}/>
            </li>
            <li>
              <input type="range" value={selectedValue} step={controlValues.step}  min={controlValues.min} max={controlValues.max} onChange={(e) => setSelectedValue(e.target.value)}/>
            </li>
            <li>
              <input type="number" name="step"  defaultValue={controlValues.step} onChange={controlsOnChange}/>
            </li>
            <li>
              <input type="number" name="max" defaultValue={controlValues.max} onChange={controlsOnChange} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SnippetSlider;
