import classes from "./Snippet.module.css";

function Snippet(props) {
  return (
    <li id={props} > 
      <div className={classes.snippet}>
        {props.children}
      </div>
    </li>
  );
}

export default Snippet;
