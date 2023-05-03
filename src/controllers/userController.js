const User = require('../models/User');

exports.index = async (req, res) =>{
  try{
    const users = await User.findAll({ attributes: ['id', 'name', 'email'] });

    return res.json(users);
  }catch(e){
    return res.json(null);
  }
};

exports.show = async (req, res) =>{
  try{
    const {id} = req.params;
    const user = await User.findByPk(id);

    return res.json(user);
  }catch(e){
    console.log(e);
    return res.json(null);
  }
};

exports.create = async (req, res) =>{
  try{
    const newUser = await User.create(req.body);
    const { id, name, email } = newUser;

    return res.json({ id, name, email });
  }catch(e){
    return res.status(400).json({
      errors: e.errors.map((err) => err.message)
    });
  }
};

exports.update = async (req, res) =>{
  try{
    const { userId } = req;

    if(!userId){
      return res.status(400).json({
        errors: ['ID não enviado']
      });
    }

    const user = await User.findByPk(userId);

    if(!user){
      return res.status(400).json({
        errors: ['Usuário não existe']
      });
    }

    const newData = await user.update(req.body);
    const { id, name, email } = newData;

    return res.json({ id, name, email });
  }catch(e){
    return res.status(400).json({
      errors: e.errors.map((err) => err.message)
    });
  }
};

exports.delete = async (req, res) =>{
  try{
    const { userId } = req;

    if(!userId){
      return res.status(400).json({
        errors: ['ID não enviado']
      });
    }

    const user = await User.findByPk(userId);

    if(!user){
      return res.status(400).json({
        errors: ['Usuário não existe']
      });
    }

    await user.destroy();

    return res.json({
      msg: 'Usuário deletado'
    });
  }catch(e){
    return res.status(400).json({
      errors: e.errors.map((err) => err.message)
    });
  }
};
