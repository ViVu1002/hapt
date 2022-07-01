'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Order_products', [{
      orderId: 2,
      productId: 2,
      quantity: 5,
      order_price: 15000,
      createdAt:new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Order_products');
  }
};
