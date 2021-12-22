import { useState, useEffect } from "react";
import Notifications, { notify } from "react-notify-toast";

import NoImage from "./NoImage";

import classes from "./ImageView.module.css";

import axios from "axios";

import testImage from "../../../../images/landscape.jpg";
import group from "../../../../images/group_photo.jpg";

import loading_icon from "../../../../images/loading.svg";

const MAX_SIZE = 5 * 1024 * 1024; //MAX_SIZE in MB

let myColour = { background: "#FFF", text: "#000" };

function ImageView() {
  const [isUploading, setIsUploading] = useState(false);

  const toast = notify.createShowQueue();

  function onImageUpload(e) {
    e.preventDefault();

    const errs = [];
    const files = Array.from(e.target.files);

    const formData = new FormData();
    const types = ["image/bmp", "image/tiff", "image/jpeg", "image/png"];

    files.forEach((file) => {
      if (types.every((type) => file.type !== type)) {
        errs.push(`'${file.format}' is not of supported type`);
      }

      if (file.size > MAX_SIZE) {
        errs.push(`'${file.format}' is too large`);
      }

      formData.append("file", file);
    });

    setIsUploading(true); 
  }

  return (
    <div className={classes.setup}>
      <NoImage />
    </div>
  );

  // return (
  //   <div className={classes.setup}>
  //     <input type="file" multiple accept="image/*" onChange={onImageUpload} />
  //     <img src={loading_icon} alt="" />
  //     {imageURLS.map((imageSrc) => (
  //       <img src={imageSrc} />
  //     ))}
  //   </div>

  // <div className={classes.setup}>
  //   <div className={classes.toolbar}></div>
  //   <div className={classes.image}>
  //     <img src={testImage} alt="" />
  //   </div>
  // </div>
  //);
}

export default ImageView;
