"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('users', [{
      name: 'John',
      email: 'demo@demo.com',
      password: 'demo@demo.com',
      address : 'ha noi',
      role: false,
      createdAt :new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
