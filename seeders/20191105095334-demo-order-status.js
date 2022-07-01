'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Order_statuses', [{
      name: 'Nguyen Thi B',
      orderId: 2,
      note: 'Dang giao hang',
      createdAt: new Date(),
      updatedAt: new Date()
    }] , {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Order_statuses');
  }
};
