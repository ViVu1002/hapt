"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order_product = sequelize.define(
    "Order_product",
    {
      orderId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      order_price: DataTypes.INTEGER
    },
    {}
  );
  Order_product.associate = function(models) {
    Order_product.belongsTo(models.Orders, {
      foreignKey: "orderId",
      target: "id",
      as: "order"
    });
  };
  return Order_product;
};
