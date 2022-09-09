const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+ '--'+ file.originalname)
      console.log(file);
    }
  })
  
 exports.upload = multer({ storage: storage})