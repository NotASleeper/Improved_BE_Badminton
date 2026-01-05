"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Promotions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      type: {
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.INTEGER,
      },
      min_order_value: {
        type: Sequelize.INTEGER,
      },
      max_value: {
        type: Sequelize.INTEGER,
      },
      require_point: {
        type: Sequelize.INTEGER,
      },
      max_uses: {
        type: Sequelize.INTEGER,
      },
      used_count: {
        type: Sequelize.INTEGER,
      },
      userid: {
        type: Sequelize.INTEGER,
      },
      start: {
        type: Sequelize.DATE,
      },
      end: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Promotions");
  },
};
