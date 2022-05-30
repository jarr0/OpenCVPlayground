import classes from "./Snippet.module.css";
import ReactTooltip from "react-tooltip";

import {
  add,
  help,
  move_up,
  move_to_top,
  move_down,
  move_to_bottom,
  trash,
} from "../../../../../images/snippetControls";

function SnippetHeader(props) {
  const library_controls = (
    <div className={classes.header}>
      <h2>{props.item.func_name}</h2>
      <ul className={classes.library_controls}>
        <li>
          <a href={props.item.docs} target="">
            <img src={help} alt="Show snippet docs" />{" "}
          </a>
        </li>

        <li>
          <img src={add} alt="Add snippet" />
        </li>
      </ul>
    </div>
  );

  const desc = props.item.long_description

  const selected_controls = (
    <div className={classes.header}>
      <ul>
        <li>
          <h2>{props.item.func_name} ‎</h2>
        </li>
        <li>
          <a data-tip="helo">
            <img src={help} alt="" />
          </a>
          <ReactTooltip place="right" effect="solid" aria-haspopup='true'/>
            
        </li>
      </ul>
      <ul className={classes.selected_controls}>
        <li>
          <img src={trash} alt="Delete snippet" />
        </li>
        <li>
          <img src={move_up} alt="Move snippet up" />
        </li>
        <li>
          <img src={move_down} alt="Move snippet down" />
        </li>
        <li>
          <img src={move_to_top} alt="Move snippet to top" />
        </li>
        <li>
          <img src={move_to_bottom} alt="Move snippet to bottom" />
        </li>
      </ul>
    </div>
  );

  return props.type === "library" ? library_controls : selected_controls;
}

export default SnippetHeader;
