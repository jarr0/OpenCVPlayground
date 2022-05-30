import classes from "./NoImage.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import loading_icon from "../../../../images/loading.svg";

function NoImage(props) {
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

    console.log(selectedFiles)
    selectedFiles.forEach((file) => data.append("file", file));

    axios
      .post("http://localhost:8000/upload_image", data, {
        onUploadProgress: (ProgressEvent) => {
          console.log(
            "progresss: ",
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
        },
      })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) { 
          props.handler()
        }
      });

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
