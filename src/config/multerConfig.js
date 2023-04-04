const multer = require('multer');
const { resolve, extname } = require('path');

module.exports = {
  storage: multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, cb) =>{
      cb(null, `${Date.now()}${extname(file.originalname)}`);
    }
  })
};
