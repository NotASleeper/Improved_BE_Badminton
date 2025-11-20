"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userid: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "users",
        //   key: "id",
        // },
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.TEXT,
      },
      toxicscore: {
        type: Sequelize.FLOAT,
      },
      status: {
        type: Sequelize.STRING,
      },
      productid: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "products",
        //   key: "id",
        // },
      },
      orderid: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "orders",
        //   key: "id",
        // },
      },
      prereviewid: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "reviews",
        //   key: "id",
        // },
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
    await queryInterface.dropTable("Reviews");
  },
};
