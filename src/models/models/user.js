'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id_department: DataTypes.INTEGER,
    id_role: DataTypes.INTEGER,
    user_email: DataTypes.TEXT,
    user_password: DataTypes.TEXT,
    user_name: DataTypes.TEXT,
    user_gender: DataTypes.INTEGER,
    user_dob: DataTypes.TEXT,
    user_address: DataTypes.TEXT,
    user_status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};