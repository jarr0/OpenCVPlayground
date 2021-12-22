import classes from "./NoImage.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as fs from 'fs';

import loading_icon from "../../../../images/loading.svg";

function NoImage() {
  var [selectedImage, setSelectedImage] = useState(null);
  const [uploadingProgress, setUploadingProgress] = useState(null);

  const inputFile = useRef(null);

  function onClickHandler() {
    inputFile.current.click();
  }

  function onChangeHandler(e) {
    const selectedFiles = Array.from(e.target.files);
    setSelectedImage(e.target.files[0]);

    const data = new FormData();

    selectedFiles.forEach((file) => data.append("file", file));

    axios
      .post("http://192.168.1.107:8000/upload_image", data, {
        onUploadProgress: (ProgressEvent) => {
          console.log(
            "progresss: ",
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
        },
      })
      .then((res) => {
        console.log(res.status);
      });

    console.log("sent");

    setUploadingProgress(0);
  }

  if (uploadingProgress !== null) {
    return (
      <div>
        <img src={loading_icon} alt="" />
      </div>
    );
  } else {
    return (
      <div className={classes.no_image}>
        {console.log("remaking")}
        <input
          type="file"
          id="file"
          multiple
          ref={inputFile}
          onChange={onChangeHandler}
        />
        <button onClick={onClickHandler}>
          Click to upload an image
          <br />
          or drag and drop
        </button>
      </div>
    );
  }
}

export default NoImage;
