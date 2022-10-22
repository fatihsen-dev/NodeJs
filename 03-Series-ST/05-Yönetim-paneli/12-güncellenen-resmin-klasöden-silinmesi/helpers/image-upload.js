const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
   destination: (req, res, callback) => {
      callback(null, "./public/images/");
   },
   filename: (req, file, callback) => {
      callback(
         null,
         path.parse(file.originalname).name +
            "-" +
            Date.now() +
            path.extname(file.originalname)
      );
   },
});

const upload = multer({ storage: storage });

module.exports.upload = upload;
