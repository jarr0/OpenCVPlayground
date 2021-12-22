var express = require("express");
var app = express();
var multer = require("multer");
var cors = require("cors");
var fs = require("fs");

function addToImageData(imgFiles) {
  fs.readdir("./public/images", (err, files) => {
    if (err) {
      console.log(err);
    } else {
      if (files.indexOf("imageData.json") == -1) {
        const init = [];
        console.log(JSON.stringify(init));
        fs.writeFile(
          "./public/images/imageData.json",
          JSON.stringify(init),
          (err) => {
            console.log(err);
          }
        );
      }

      fs.readFile("./public/images/imageData.json", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const imageJSON = JSON.parse(data);

          console.log(JSON.stringify(imageJSON));
          console.log(imageJSON);

          var length = imageJSON.length;
          console.log(length);

          for (var i = 0; i < imgFiles.length; i++) {
            imageJSON.push({
              id: imageJSON.length,
              filename: imgFiles[i].originalname,
              alias: "Image " + (imageJSON.length + 1),
            });
          }

          fs.writeFile("./public/images/imageData.json", JSON.stringify(imageJSON), (err, data) => {
            if (err) {
              console.log(err)
            }
          })
        }
      });
    }
  });
}

app.use(cors());

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).array("file");

app.post("/upload_image", (req, res) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    addToImageData(req["files"])
    return res.status(200).send(req.file);
  });
});

app.listen(8000, function () {
  console.log("App running on port 8000");
});
