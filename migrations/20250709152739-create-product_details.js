"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("product_details", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.TEXT,
      },
      brand: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      warranty_period: {
        type: Sequelize.STRING,
      },
      specifications: {
        type: Sequelize.TEXT,
      },
      color: {
        type: Sequelize.STRING,
      },
      material: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.STRING,
      },
      origin_country: {
        type: Sequelize.STRING,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "products", // name of the table, not the model
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("product_details");
  },
};
