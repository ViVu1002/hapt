"use strict";
module.exports = (sequelize, DataTypes) => {
  const product_image = sequelize.define(
    "product_image",
    {
      image_1: DataTypes.STRING,
      image_2: DataTypes.STRING,
      image_3: DataTypes.STRING,
      image_4: DataTypes.STRING,
      image_5: DataTypes.STRING,
      default_image: DataTypes.STRING
    },
    {}
  );
  product_image.associate = function(models) {
    // product_image.hasOne(models.Product,{foreignKey:'picture', sourceKey:'id', as :"image"})
  };
  return product_image;
};
