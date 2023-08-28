'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Photo.init({
    id_user: DataTypes.INTEGER,
    id_department: DataTypes.INTEGER,
    photo_content: DataTypes.TEXT,
    photo_status: DataTypes.INTEGER,
    photo_censor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};