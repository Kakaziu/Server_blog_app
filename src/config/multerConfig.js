const multer = require('multer');
const { resolve, extname } = require('path');

module.exports = {
  fileFilter: (req, file, cb) =>{
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg'){
      cb(new multer.MulterError('Só aceitamos arquivos PNG ou JPEG.'));
      return;
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) =>{
      cb(null, `${Date.now()}${extname(file.originalname)}`);
    }
  })
};
