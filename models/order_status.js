"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order_status = sequelize.define(
    "Order_status",
    {
      name: DataTypes.STRING,
      orderId: DataTypes.INTEGER,
      note: DataTypes.STRING
    },
    {}
  );
  Order_status.associate = function(models) {
    Order_status.belongsTo(models.Orders, {
      foreignKey: "orderId",
      target: "id",
      as: "order_s"
    });
  };
  return Order_status;
};
