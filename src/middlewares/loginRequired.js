const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) =>{
  const token = req.header('authorization');

  if(!token){
    return res.status(401).json({ errors: ['Acess denied.'] });
  }

  try{

    const userData = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = userData;

    const user = await User.findOne({
      where: { id, email }
    });

    if(!user){
      return res.status(401).json({
        errors: ['Usuário inválido.']
      });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  }catch(e){
    return res.status(401).json({
      errors: ['Token inválido ou expirado.']
    });
  }
};
