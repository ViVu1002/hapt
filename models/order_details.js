"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order_details = sequelize.define(
    "Order_details",
    {
      orderId: DataTypes.INTEGER,
      price: DataTypes.INTEGER
    },
    {}
  );
  Order_details.associate = function(models) {
    Order_details.belongsTo(models.Orders, {
      foreignKey: "orderId",
      target: "id",
      as: "order_d"
    });
  };
  return Order_details;
};
