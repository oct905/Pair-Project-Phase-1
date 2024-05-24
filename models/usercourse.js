'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get localDateId() {
      const date = new Date(this.enrollDate)
      const format = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }
      const idDate = date.toLocaleDateString('id-ID', format)
      console.log(idDate);
      return idDate
    }
    static report(raw) {
      const date = new Date(raw)
      const format = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }

      const idDate = date.toLocaleDateString('id-ID', format)
      return `Completed at ${idDate}`
    }
    
    static associate(models) {
      // define association here
      UserCourse.belongsTo(models.Course)
      UserCourse.belongsTo(models.User)
    }
  }
  UserCourse.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    UserId: DataTypes.INTEGER,
    CourseId: DataTypes.INTEGER,
    enrollDate: DataTypes.DATE,
    completedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserCourse',
  });
  return UserCourse;
};