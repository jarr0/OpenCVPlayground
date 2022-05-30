import { useState, useEffect, useContext } from "react";
import SelectedContext from "../../../../store/selected-context";

import loadingAnimation from "../../../../images/loading.svg"

import NoImage from "./NoImage";

import classes from "./ImageView.module.css";
import axios from "axios";

function ImageView() {
  const [image, setImage] = useState();
  const [imageExists, setImageExists] = useState(false)
  const [loadingImage, setLoadingImage] = useState(false)

  const {executing, newImage, gottenImage} = useContext(SelectedContext);

  useEffect(() => {
    console.log('loading new image')
    setLoadingImage(true)
    axios.get("http://localhost:8000/get_image", {responseType: 'blob'}).then((res) => {
    if (res.status === 200) {
      setImage(URL.createObjectURL(res.data))
      setImageExists(true)
      gottenImage()
    }
  });
  }, [newImage])

  function noImgHandler() {
    setImageExists(true)
  }

  // console

  if (!imageExists) {
    return (
      <div className={classes.setup}>
        <NoImage handler = {noImgHandler}/>
      </div>
    );
  } else {
    return (
      <div className={classes.setup}>
        <div className={classes.toolbar}></div>
        <div className={classes.image}>
          <img src={image} alt="" />
          {executing ?
          <img src={loadingAnimation} alt="" />
          : null}
        </div>
      </div>
    );
  }
}

export default ImageView;
