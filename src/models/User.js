const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const { Model } = require('sequelize');

module.exports = class User extends Model{
  static init(sequelize){
    super.init({

      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O campo deve conter de 3 a 255 caractres.'
          }
        }
      },

      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'E-mail já existe'
        },
        validate: {
          isEmail: {
            msg: 'E-mail inválido'
          }
        }
      },

      password_hash: {
        type: Sequelize.STRING,
        defaultValue: ''
      },

      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'O campo deve conter de 6 a 50 caracteres.'
          }
        }
      },

      is_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        validate: {
          notEmpty: {
            msg: 'O campo não pode estar vazio'
          }
        }
      }
    }, {
      sequelize
    });

    this.addHook('beforeSave', async user =>{
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password){
    return bcrypt.compare(password, this.password_hash);
  }
};
