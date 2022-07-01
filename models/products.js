"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Products",
    {
      name: DataTypes.STRING,
      categoriesId: DataTypes.INTEGER,
      picture: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      detail: DataTypes.STRING,
      order_time: DataTypes.INTEGER
    },
    {}
  );
  Product.associate = function(models) {
    Product.belongsTo(models.product_image, {
      foreignKey: "picture",
      sourceKey: "id",
      as: "images"
    });
    Product.hasMany(models.Comment, {
      foreignKey: "productId",
      sourceKey: "id",
      as: "comments"
    });
  };
  return Product;
};
