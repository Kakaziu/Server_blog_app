const multer = require('multer');
const multerConfig = require('../config/multerConfig');

const upload = multer(multerConfig).single('photo_post_url');

module.exports = async (req, res, next) =>{
  return upload(req, res, (error) =>{
    if(error){
      return res.status(400).json({
        errors: [error.code]
      });
    }

    next();
  });
};
