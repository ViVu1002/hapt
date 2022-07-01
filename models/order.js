"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      customerId: DataTypes.INTEGER,
      order_status: DataTypes.STRING,
      total_price: DataTypes.INTEGER
    },
    {}
  );
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};
