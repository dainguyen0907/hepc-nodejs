'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_catalogue: {
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER
      },
      article_link: {
        type: Sequelize.TEXT
      },
      article_heading: {
        type: Sequelize.TEXT
      },
      article_summarize: {
        type: Sequelize.TEXT
      },
      article_content: {
        type: Sequelize.TEXT
      },
      article_view: {
        type: Sequelize.INTEGER
      },
      article_file: {
        type: Sequelize.TEXT
      },
      article_image: {
        type: Sequelize.TEXT
      },
      article_status: {
        type: Sequelize.INTEGER
      },
      article_censor: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Articles');
  }
};