"use strict";
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    "Categories",
    {
      name: DataTypes.STRING,
      cat_parent: DataTypes.INTEGER
    },
    {}
  );
  Categories.associate = function(models) {
    Categories.hasMany(models.Products, {
      foreignKey: "categoriesId",
      sourceKey: "id",
      as: "products"
    });
  };
  return Categories;
};
