"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Orders",
    {
      customerId: DataTypes.INTEGER,
      order_status: DataTypes.STRING,
      total_price: DataTypes.INTEGER
    },
    {}
  );
  Order.associate = function(models) {
    Order.hasMany(models.Order_product, {
      foreignKey: "orderId",
      sourceKey: "id",
      as: "order_products"
    });
    Order.hasMany(models.Order_details, {
      foreignKey: "orderId",
      sourceKey: "id",
      as: "order_detail"
    });
    Order.hasOne(models.Order_status, {
      foreignKey: "orderId",
      sourceKey: "id",
      as: "order_statuses"
    });
  };
  return Order;
};
