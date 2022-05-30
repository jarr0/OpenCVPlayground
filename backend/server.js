var express = require("express")
var app = express()
var multer = require("multer")
var cors = require("cors")
var fs = require("fs")
var spawn = require("child_process").spawn

function addToImageData(imgFiles) {
  fs.readdir("./images", (err, files) => {
    if (err) {
      console.log(err)
    } else {
      if (files.indexOf("imageData.json") == -1) {
        const init = []
        fs.writeFile("./images/imageData.json", JSON.stringify(init), (err) => {
          console.log(err)
        })
      }

      fs.readFile("./images/imageData.json", (err, data) => {
        if (err) {
          console.log(err)
        } else {
          const imageJSON = JSON.parse(data)

          var length = imageJSON.length

          for (var i = 0; i < imgFiles.length; i++) {
            imageJSON.push({
              id: imageJSON.length,
              filename: imgFiles[i].originalname,
              alias: "Image " + (imageJSON.length + 1),
            })
          }

          fs.writeFile(
            "./images/imageData.json",
            JSON.stringify(imageJSON),
            (err, data) => {
              if (err) {
                console.log(err)
              }
            }
          )
        }
      })
    }
  })
}

app.use(cors())
app.use(express.json())

var imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ".")
  },
  filename: (req, file, cb) => {
    cb(null, "base_image.jpg")
  },
})

var jsonStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  },
  filename: (req, file, cb) => {
    cb(null, "instructions.json")
  },
})

app.get("/get_config", (req, res) => {
  configExists = fs.existsSync("./ocvGen/data.json")

  if (configExists) {
    const config = fs.createReadStream("ocvGen/data.json")
    config.pipe(res)
  } else {
    res.sendStatus(204)
  }
})

var imageUpload = multer({ storage: imageStorage }).single("file")
var jsonUpload = multer({ storage: jsonStorage }).single("file")

app.get("/get_image", (req, res) => {
  customImageExists = fs.existsSync("./custom.jpg")
  imageExists = fs.existsSync("./base_image.jpg")


  if (customImageExists) {
    // when the base image has been edited
    res.sendFile("custom.jpg", { root: __dirname })
  } else {
    // only if image has been uploaded, but not modified
    if (imageExists) {
      res.sendFile("base_image.jpg", { root: __dirname })
    } else {
      res.status(204)
      res.send()
    }
  }
})

app.post("/upload_config", (req, res) => {
  saveJSONInstructions(req.body)

  jsonUpload(req.body, res, (err) => {})
})

app.post("/upload_image", (req, res) => {
  imageUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    //addToImageData(req["files"])
    return res.status(200).send(req.file)
  })
})

var fs = require("fs")

app.post("/refresh_image", async (req, res) => {
  let data = JSON.stringify(req.body)

  fs.writeFile("./ocvGen/data.json", data, (err) => {
    if (err) {
      console.log(err)
    } else {
      generateCode()
        .then((value) => {
          console.log(value)
          res.sendStatus(200)
        })
        .catch((err) => {
          console.log("error", err)
        })
    }
  })

  // return res.status(200).send(req.file);
})

app.post("/load_prev_config", (req, res) => {})

app.get("/config_exists", (req, res) => {
  console.log("hello")
})

async function generateCode() {
  var process = spawn("python", ["./ocvGen/execute.py"])

  let stdOut = ""
  let stdErr = ""

  process.stdout.on("data", (data) => {
    stdOut += data.toString()
  })

  process.stderr.on("data", (data) => {
    stdErr += data.toString()
  })

  return await new Promise((res, rej) => {
    process.on("exit", (code) => {
      if (code) {
        console.log("error code", code, stdOut)
        rej(stdErr)
      } else {
        res(stdOut)
      }
    })
  })
}

app.listen(8000, function () {
  console.log("App running on port 8000")
})
