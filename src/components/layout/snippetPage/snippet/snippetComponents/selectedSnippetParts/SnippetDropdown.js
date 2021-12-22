import classes from "./parts.css"

function SnippetDropdown(props) {
  return (
    <div className={classes.dropdown}>
      <p>A: {props.param_name}</p>
      <select name="arg_1" id="arg_1">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </div>
  );
}

export default SnippetDropdown;
