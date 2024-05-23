'use strict';
const {
  Model
} = require('sequelize');
const bcryptjs = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserCourse)
      User.belongsToMany(models.Course, {
        through: models.UserCourse
      })
      User.hasOne(models.Profile)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    userName: {
      type: DataTypes.STRING
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    user.role = 'user'
    let salt = bcryptjs.genSaltSync(10);
    let hash = bcryptjs.hashSync(user.password, salt);
    user.password = hash
  })
  return User;

};