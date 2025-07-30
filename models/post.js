"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    static associate(models) {
      // post belongs to a User (doctor)
      post.belongsTo(models.user, {
        foreignKey: "doctor_id",
        as: "doctor",
      });
    }
  }
  post.init(
    {
      doctor_id: DataTypes.INTEGER,
      specialization: DataTypes.STRING,
      consultation_fee: DataTypes.STRING,
      availability: DataTypes.STRING,
      next_slot: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "post",
      tableName: "posts",
    }
  );
  return post;
};
