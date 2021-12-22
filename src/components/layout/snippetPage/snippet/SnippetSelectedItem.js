import { Snippet, SnippetHeader, SnippetSlider } from "./snippetComponents";
import classes from "./snippetComponents/Snippet.module.css";

import { SnippetDropdown } from './snippetComponents/selectedSnippetParts'

import data from "../snippetData/function_data.json";

function SnippetSelectedItem(props) {
  var content

  const params = props.item.signature

  const children = []
  params.map((param) => {
    const part = param.var_type.split(':')[0]

    if (part === 'InputArray' | part === 'OutputArray' | part === 'dropdown' ) {
      console.log('adding')
      children.push(SnippetDropdown(props))
    }
  })

  return (
    <Snippet className={classes.library_snippet}>
      <div className={classes.selected_snippet}>
        <SnippetHeader type="selected" item={props.item} />
        {children}
      </div>
    </Snippet>
  )
}

export default SnippetSelectedItem

