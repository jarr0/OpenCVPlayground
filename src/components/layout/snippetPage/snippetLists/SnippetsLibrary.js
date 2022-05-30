import { useState, useContext, useEffect } from "react";

import classes from "./SnippetsList.module.css";

import SnippetLibraryItem from "../snippet/SnippetLibraryItem";
import SelectedContext from "../../../../store/selected-context";

function SnippetsLibrary(props) {
  const selectedContext = useContext(SelectedContext)
  let searching = false

  const [libraryItems, setLibraryItems] = useState([])

  useEffect(() => {
    setLibraryItems(props.data)
  }, [])

  function librarySnippetClickedHandler(id) {
    selectedContext.addSelected(id)
  }

  let filteredArray = []
  function searchBarHandler(e) {
    if (e.target.value != '') {
      searching = true

      const searchTerm = e.target.value.toLowerCase()
      filteredArray = props.data.filter((next) => {
        return next.func_name.toLowerCase()
        .indexOf(searchTerm) !== -1
      })

      setLibraryItems(filteredArray)
    } else {
      searching = false
      setLibraryItems(props.data)
    }
  }

  return (
    <div className={classes.list_library}>
      <div className={classes.list}>
        <h1>Library</h1>
        {/* Will implement later */}
        <input type="text" id="search" placeholder="Search library" onKeyUp={searchBarHandler}/>
        <ul>
          {libraryItems.map((item) => (
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
