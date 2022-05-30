import { createContext, useState } from "react"
import axios from "axios"

import data from "../components/layout/snippetPage/snippetData/function_data.json"

const SelectedContext = createContext({
  selected: [],
  image: null,
  executing: false,
  newImage: true,
  prevSession: () => {},
  gottenImage: () => {},
  addSelected: (selectedID) => {},
  removeSelected: (selectedID) => {},
  changeParameter: (parameterID, newValue) => {},
})

export function SelectedContextProvider(props) {
  const [selectedSnippets, setSelectedSnippets] = useState([])
  const [executingCode, setExecutingCode] = useState(false)

  const [newImageReady, setNewImageReady] = useState(true)

  function checkForPrevSessionHandler() {
    console.log(selectedSnippets)
    axios
      .get("http://localhost:8000/get_config")
      .then((res) => {
        if (res.status === 200) {
          const foundConfig = res.data

          if (foundConfig !== '') {
            setSelectedSnippets(res.data)
          }
        }
      })

      console.log(selectedSnippets)
  }

  function gottenImageHandler() {
    setNewImageReady(false)
  }

  function addSelectedHandler(selectedID) {
    const count = selectedSnippets.filter((nextItem) => {
      return nextItem.id === selectedID
    }).length

    const new_id = `${selectedID}_${count}`

    const funcDef = data.find((item) => item.id === selectedID)
    const funcSignature = funcDef.signature

    const funcSigWithValue = funcSignature.map((item) => {
      return {
        ...item,
        value: null,
        additional_values: null
      }
    })

    const snippetDef = funcDef

    snippetDef.signature = funcSigWithValue
    snippetDef.selected_id = new_id

    setSelectedSnippets((prev) => {
      return prev.concat(snippetDef)
    })
  }

  function removeSelected(selectedID) {}

  function changeParameter(paramterID, newValue) {
    const funcID = paramterID.split("#")[0]
    const paramNo = paramterID.split("#")[1]

    const foundSnippet = selectedSnippets.find(
      (item) => item.selected_id === funcID
    )

    const curSelectedSnippets = selectedSnippets

    curSelectedSnippets.forEach((item, index) => {
      if (item.selected_id === funcID) {
        item.signature[parseInt(paramNo)].value = newValue
      }
    })

    const data = new FormData()
    const jsonData = JSON.stringify(selectedSnippets)

    data.append("file", jsonData)

    setExecutingCode(true)

    axios
      .post("http://localhost:8000/refresh_image", selectedSnippets)
      .then((res) => {
        if (res.status === 200) {
          setNewImageReady(true)
          setExecutingCode(false)
        }
      })
  }

  const context = {
    selected: selectedSnippets,
    executing: executingCode,
    newImage: newImageReady,
    prevSession: checkForPrevSessionHandler,
    gottenImage: gottenImageHandler,
    addSelected: addSelectedHandler,
    removeSelected: removeSelected,
    changeParameter: changeParameter,
  }

  return (
    <SelectedContext.Provider value={context}>
      {props.children}
    </SelectedContext.Provider>
  )
}

export default SelectedContext
