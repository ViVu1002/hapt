'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image_1: {
        type: Sequelize.STRING
      },
      image_2: {
        type: Sequelize.STRING
      },
      image_3: {
        type: Sequelize.STRING
      },
      image_4: {
        type: Sequelize.STRING
      },
      image_5: {
        type: Sequelize.STRING
      },
      default_image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_images');
  }
};