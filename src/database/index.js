try{
  const Sequelize = require('sequelize');
  const databaseConfig = require('../config/database');
  const User = require('../models/User');
  const Post = require('../models/Post');

  const models = [User, Post];

  const connection = new Sequelize(databaseConfig);

  models.forEach((model) => model.init(connection));
  models.forEach((model) => model.associate && model.associate(connection.models));
}catch(e){
  console.error('UNABLE:' + e);
}
