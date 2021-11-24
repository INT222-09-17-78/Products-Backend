const upload = require("../middleware/upload");

// const URL = "http://localhost:8888/get-cfiles/";
const fs = require("fs");
// const { nextTick } = require("process");


const uploadFile = async (req, res, next) => {
  try {
    await upload.uploadUserPromise(req, res);
    // console.log(req.file)
    // req.file = req.file
    // if (req.file == undefined) {
    //   return res.status(400).send({ message: "Choose a file to upload" });
    // }

    next()
  } catch (err) {
    console.log(err.message);

    // if (err.code == "LIMIT_FILE_SIZE") {
    //   return res.status(500).send({
    //     message: "File size should be less than 5MB",
    //   });
    // }
    // if (err.code == "The file is not image!") {
    //   return res.status(500).send({
    //     message: "Please upload an image only",
    //   });
    // }

    res.status(500).json({
      message: ` ${err.message}`,
    });
  }
  
};

const getFilesList = (req, res) => {
  const path = __basedir + "/images/";

  fs.readdir(path, function (err, files) {
    if (err) {
      res.status(500).json({
        message: "Files not found.",
      });
    }

    let filesList = [];

    files.forEach((file) => {
      filesList.push({
        name: file,
        // url: URL + file,
      });
    });

    res.status(200).json(filesList);
  });
};

const downloadFiles = (req, res) => {
    const fileName = req.params.name;
    const path = __basedir + "/images/";
  
    res.download(path + fileName, (err) => {
      if (err) {
        res.status(500).json({
          message: "File can not be downloaded: " + err,
        });
      }
    });
};

module.exports = { uploadFile, downloadFiles, getFilesList };