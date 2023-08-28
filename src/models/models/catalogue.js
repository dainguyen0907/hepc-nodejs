'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class catalogue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  catalogue.init({
    id_department: DataTypes.INTEGER,
    catalogue_name: DataTypes.TEXT,
    catalogue_link: DataTypes.TEXT,
    catalogue_status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'catalogue',
  });
  return catalogue;
};