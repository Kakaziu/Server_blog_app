const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.create = async (req, res) =>{
  try{
    const { email = '', password = '' } = req.body;

    if(!email || !password){
      return res.status(401).json({ errors: ['Credenciais inválidas.'] });
    }

    const user = await User.findOne({ where: { email } });

    if(!user){
      return res.status(401).json({ errors: ['Usuário não existe.'] });
    }

    const passwordMatch = await user.passwordIsValid(password);

    if(!passwordMatch){
      return res.status(401).json({ errors: ['Senha incorreta.'] });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRE
    });

    res.header('authorization', token);
    return res.json({ user, token });
  }catch(e){
    return res.status(401).json({ errors: ['Não foi possível logar o usuário.'] });
  }
};
