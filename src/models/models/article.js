'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Article.init({
    id_catalogue: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    article_link: DataTypes.TEXT,
    article_heading: DataTypes.TEXT,
    article_summarize: DataTypes.TEXT,
    article_content: DataTypes.TEXT,
    article_view: DataTypes.INTEGER,
    article_file: DataTypes.TEXT,
    article_image: DataTypes.TEXT,
    article_status: DataTypes.INTEGER,
    article_censor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};