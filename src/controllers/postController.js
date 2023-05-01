const Post = require('../models/Post');
const User = require('../models/User');

exports.index = async (req, res) =>{
  try{
    const posts = await Post.findAll();

    return res.json(posts);
  }catch(e){
    return res.json(null);
  }
};

exports.show = async (req, res) =>{
  const { id } = req.params;

  try{
    const post = await Post.findByPk(id);

    if(!post){
      return res.status(400).json({ errors: ['Post não encontrado.'] });
    }

    return res.json(post);
  }catch(e){
    return res.json(null);
  }
};

exports.create = async (req, res) =>{
  const { userId } = req;

  try{
    const user = await User.findByPk(userId);

    if(!user){
      return res.status(400).json({
        errors: ['Autor não existe.']
      });
    }

    const newPost = await Post.create({
      title: req.body.title,
      description: req.body.description,
      photo_post_url: `http://localhost:3333/images/${req.file.filename}`,
      create_by: userId
    });

    return res.json(newPost);
  }catch(e){
    return res.status(400).json({
      errors: e.errors.map(err => err.message)
    });
  }
};

exports.update = async (req, res) =>{
  const { id } = req.params;

  try{
    const post = await Post.findByPk(id);

    if(!post){
      return res.status(400).json({
        errors: ['Post não encontrado.']
      });
    }

    if(post.create_by !== req.userId){
      return res.status(401).json({
        errors: ['Você não tem permissão para alterar este post']
      });
    }

    let newPost;

    if(!req.file){
      newPost = await post.update(req.body);
    }else{
      newPost = await post.update({
        title: req.body.title,
        description: req.body.description,
        photo_post_url: `http://54.207.30.74:3333/images/${req.file.filename}`
      });
    }

    return res.json(newPost);
  }catch(e){
    console.log(e);
    return res.status(400).json({
      errors: e.errors.map(err => err.message)
    });
  }
};

exports.delete = async (req, res) =>{
  const { id } = req.params;

  try{
    const post = await Post.findByPk(id);

    if(!post){
      return res.status(400).json({
        errors: ['Post não encontrado.']
      });
    }

    if(post.create_by !== req.userId){
      return res.status(401).json({
        errors: ['Você não tem permissão para apagar este post']
      });
    }

    await post.destroy();
    return res.json({ msg: 'Post deletado' });
  }catch(e){
    return res.json(null);
  }
};
