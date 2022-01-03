import classes from "./Parts.module.css";

function SnippetBoolean(props) {
  return (
    <div className={classes.arg_setup}>
      <div className={classes.boolean}>
        <ul>
          <li>
            <h3>{props.param_name}</h3>
          </li>
          <li>
            <input type="checkbox" name="" id="" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SnippetBoolean;
