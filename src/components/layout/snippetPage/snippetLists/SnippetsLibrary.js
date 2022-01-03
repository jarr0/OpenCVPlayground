import { useContext } from "react";

import classes from "./SnippetsList.module.css";

import SnippetLibraryItem from "../snippet/SnippetLibraryItem";
import SelectedContext from "../../../../store/selected-context";

function SnippetsLibrary(props) {
  const selectedContext = useContext(SelectedContext)

  function librarySnippetClickedHandler(id) {
    selectedContext.addSelected(id)
  }

  return (
    <div className={classes.list_library}>
      <div className={classes.list}>
        <h1>Library</h1>
        <input type="text" id="search" placeholder="Search library" />
        <ul>
          {props.data.map((item) => (
            <div onClick={() => librarySnippetClickedHandler(item.id)} id={item.id} key={item.id}>
              <SnippetLibraryItem item={item} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SnippetsLibrary;
