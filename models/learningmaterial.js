'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LearningMaterial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LearningMaterial.init({
    CourseId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    materials: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'LearningMaterial',
  });
  return LearningMaterial;
};