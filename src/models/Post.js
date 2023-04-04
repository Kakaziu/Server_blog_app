const Sequelize = require('sequelize');
const { Model } = require('sequelize');

module.exports = class Post extends Model{
  static init(sequelize){
    super.init({
      title: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'O campo título não pode ficar vazio.'
          }
        }
      },

      description: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'O campo descrição não pode ficar vazio.'
          }
        }
      },

      photo_post_url: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'O campo de foto não pode ficar vazio.'
          }
        }
      },

      create_by: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'O post precisa de um autor'
          }
        }
      }
    }, {
      sequelize
    });
  }
};
