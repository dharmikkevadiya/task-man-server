const multer = require("multer");
const fs = require("fs");
const path = require("path");
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 25722880

class FileStorage {
  constructor(mimeTypes) {
    this.mimeTypes = mimeTypes;
    // this.maxSize = 1 * 1024 * 1024; // 1048576
    // this.destinationPath = "../public/uploads/";
  }

  fileFilter = (req, file, cb) => {
    console.log("Max size: " + this.maxSize);

    if (this.mimeTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Invalid file extension: allowed [jpeg, jpg, png]"));
  };
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(appRoot, "../public/uploads/"));
    },
    filename: function (req, file, cb) {
      const uniqueName = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`;
      // 3746674586-836534453.png
      cb(null, uniqueName);
    },
  });
  upload = multer({
    storage: this.storage,
    limits: {
      fileSize: 1 * 1024 * 1024, // 5mb
    },
    fileFilter: this.fileFilter,
  }); // 5mb

  remove = (fileName) => {
    let filePath = path.join(appRoot, "../public/uploads/") + `${fileName}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  };
}

module.exports = { FileStorage };
