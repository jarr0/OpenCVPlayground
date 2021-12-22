import classes from "./SnippetSlider.module.css"

function SnippetSlider() {
 return (
   <div className={classes.slider}>
     <div className={classes.threshold} ><input type="number" placeholder="min"/></div>
     <div className={classes.range} ><input type="range" min="1" max="100"/></div>
     <div className={classes.threshold}><input type="number" placeholder="max"/></div>
     <div className={classes.current}><input type="number" placeholder="max"/></div>
   </div>
 )
}

export default SnippetSlider