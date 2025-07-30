"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      rating.belongsTo(models.user, {
        foreignKey: "patient_id",
        as: "patient",
      });

      rating.belongsTo(models.post, {
        foreignKey: "post_id",
        as: "post",
      });
    }
  }
  rating.init(
    {
      patient_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "rating",
    }
  );
  return rating;
};
