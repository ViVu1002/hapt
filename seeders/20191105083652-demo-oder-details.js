'use strict';
module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('order_details', [{
      orderId: 1,
      price: 20,
      createdAt :new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('order_details', null, {});
  }
};