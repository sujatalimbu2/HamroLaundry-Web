const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination : function(res, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (res, file, cb){
         cb(null, Date.now() + path.extname(file.originalname));
    },
})// local drive

const upload = multer({storage});
module.exports = upload;