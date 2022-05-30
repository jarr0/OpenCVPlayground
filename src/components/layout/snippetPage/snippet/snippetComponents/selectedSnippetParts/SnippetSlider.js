import { useState, useContext, useEffect } from "react";
import SelectedContext from "../../../../../../store/selected-context";

import classes from "./Parts.module.css";

function SnippetSlider(props) {
  const selectedContext = useContext(SelectedContext);

  const [selectedValue, setSelectedValue] = useState(
    props.var_type === "int" ? 1:0.1
  );

  const [controlValues, setControlValues] = useState({
    min: 0,
    max: props.var_type === 'int' ? 10:1,
    step: props.var_type === 'int' ? 1:0.1,
    error: false,
    minError: false,
    maxError: false,
    stepError: false,
  });

  function mouseUpHandler(e) {
    selectedContext.changeParameter(props.argID, e.target.value)
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
            <li
              className={controlValues.minError ? classes.slider_error : null}
            >
              <input
                type="number"
                name="min"
                placeholder="min"
                defaultValue={controlValues.min}
                onKeyUp={controlsOnChange}
                disabled={controlValues.error && !controlValues.minError}
              />
            </li>
            <li>
              <input
                type="range"
                value={selectedValue}
                step={controlValues.step}
                min={controlValues.min}
                max={controlValues.max}
                onMouseUp={mouseUpHandler}
                onChange={(e) => setSelectedValue(e.target.value)}
                disabled={controlValues.error}
              />
            </li>
            <li className={controlValues.maxError ? classes.slider_error : null}>
              <input
                type="number"
                name="max"
                placeholder="max"
                defaultValue={controlValues.max}
                onKeyUp={controlsOnChange}
                disabled={controlValues.error && !controlValues.maxError}
              />
            </li>
            <li className={controlValues.stepError ? classes.slider_error : null}>
              <input
                type="number"
                name="step"
                placeholder="step"
                defaultValue={controlValues.step}
                onKeyUp={controlsOnChange}
                disabled={controlValues.error && !controlValues.stepError}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  function controlsOnChange (e) {
    const inVal = e.target.value
    var invalidInput = (inVal == '')

    var value = 0

    if (props.var_type === 'int') {
      invalidInput = invalidInput || inVal.includes('.')
      value = parseInt(inVal)
    } else {
      value = parseFloat(inVal)
    }

    switch (e.target.name) {
      case "min":
        if (invalidInput || value > controlValues.max) {
          setControlValues((prev) => ({
            ...prev,
            minError: true,
            error: true
          }))
        } else {
          setControlValues((prev) => ({
            ...prev,
            min: value,
            error: false,
            minError: false
          }))
        }
        break;
      case "max":
        if (invalidInput || value < controlValues.min) {
          setControlValues((prev) => ({
            ...prev,
            maxError: true,
            error: true
          }))
        } else {
          setControlValues((prev) => ({
            ...prev,
            max: value,
            error: false,
            maxError: false
          }))
        }
        break;
      case "step":
        if (invalidInput || value > controlValues.max - controlValues.min) {
          setControlValues((prev) => ({
            ...prev,
            stepError: true,
            error: true
          }))
        } else {
          setControlValues((prev) => ({
            ...prev,
            step: value,
            error: false,
            stepError: false
          }))
        }
        break;
    }
  }
}

export default SnippetSlider;
