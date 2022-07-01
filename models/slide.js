"use strict";
module.exports = (sequelize, DataTypes) => {
  const Slide = sequelize.define(
    "Slide",
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {}
  );
  Slide.associate = function(models) {
    Slide.belongsTo(models.product_image, {
      foreignKey: "image",
      sourceKey: "id",
      as: "slide_images"
    });
  };
  return Slide;
};
