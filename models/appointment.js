"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // post belongs to a User (doctor)
      appointment.belongsTo(models.user, {
        foreignKey: "patient_id",
        as: "patient",
      });

      appointment.belongsTo(models.post, {
        foreignKey: "post_id",
        as: "post",
      });
    }
  }
  appointment.init(
    {
      patient_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
      appointment_date: DataTypes.STRING,
      appointment_time: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "appointment",
      tableName: "appointments",
    }
  );
  return appointment;
};
