import { createContext, useState } from "react";

import axios from "axios";

const ImageStateContext = createContext({
  image: null,
  userError: null,
  serverError: null,
  reloadImage: () => {},
});

export function ImageStateContextProvider(props) {
  const [isLoading, setIsLoading] = useState(false);

  function getFilteredImage() {
    setIsLoading(true);

    axios
      .get("http://localhost:8000/edited_image", { responseType: "blob" })
      .then((res) => {
        if (res.status === 200) {
          // generating image was sucessful
          const imageBlob = URL.createObjectURL(res.data);
          // image = imageBlob;

          // userError = null;
          // serverError = null;
        } else if (res.status === 422) {
          //the user inputed a value that does not work with opevCV

          // serverError = null;
          // userError = "wrong input grrr";
        } else if (res.status === 500) {
          // something else went wrong and ill handle this when i come to
          // that bridge 

          // userError = null;
          // serverError = "ahhh something else went wrong :(";
        }

        setIsLoading(false);
      });
  }

  const context = {
    image: null,
    userError: null,
    serverError: null,
    reloadImage: getFilteredImage,
  };

  return (
    <ImageStateContext.Provider value={context}>
      {props.children} 
    </ImageStateContext.Provider>
  )
}

export default ImageStateContext