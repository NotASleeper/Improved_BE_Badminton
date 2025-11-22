"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Nguyễn Văn A",
          username: "nguyenvana",
          password: bcrypt.hashSync("123", 10), // nên hash trước khi seed thật
          email: "vana@example.com",
          gender: "male",
          address: "123 Đường A, Quận 1, TP.HCM",
          phonenumber: "0909123456",
          loyaltypoint: 0,
          roleid: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Trần Thị B",
          username: "tranthib",
          password: bcrypt.hashSync("123", 10),
          email: "thib@example.com",
          gender: "female",
          address: "456 Đường B, Quận 2, TP.HCM",
          phonenumber: "0912345678",
          loyaltypoint: 0,
          roleid: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lê Văn C",
          username: "levanc",
          password: bcrypt.hashSync("123", 10),
          email: "vanc@example.com",
          gender: "male",
          address: "789 Đường C, Quận 3, TP.HCM",
          phonenumber: "0923456789",
          loyaltypoint: 0,
          roleid: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Phạm Thị D",
          username: "phamthid",
          password: bcrypt.hashSync("123", 10),
          email: "thid@example.com",
          gender: "female",
          address: "101 Đường D, Quận 4, TP.HCM",
          phonenumber: "0934567890",
          loyaltypoint: 0,
          roleid: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Đỗ Văn E",
          username: "dovane",
          password: bcrypt.hashSync("123", 10),
          email: "vane@example.com",
          gender: "male",
          address: "202 Đường E, Quận 5, TP.HCM",
          phonenumber: "0945678901",
          loyaltypoint: 0,
          roleid: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
