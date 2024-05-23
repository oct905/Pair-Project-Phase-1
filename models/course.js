'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.hasMany(models.UserCourse)
      Course.belongsToMany(models.User, {
        through: models.UserCourse
      })
      Course.hasMany(models.LearningMaterial)
    }
  }
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    imageURL: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};