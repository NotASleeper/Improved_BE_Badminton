"use strict";

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
      "products",
      [
        {
          categoriesid: 1,
          price: 4309000,
          brand: "Yonex",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 1,
          price: 599000,
          brand: "Yonex",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 1,

          price: 4599000,
          brand: "Yonex",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 1,
          price: 950000,
          brand: "Lining",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 1,

          price: 1590000,
          brand: "Yonex",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 2,

          price: 649000,
          brand: "Yonex",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 2,

          price: 2799000,
          brand: "Yonex",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 2,

          brand: "Kawasaki",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 2,

          price: 2150000,
          brand: "Lining",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 2,
          price: 1325000,
          brand: "Lining",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 3,

          price: 129000,
          brand: "Yonex",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 3,

          price: 130000,
          brand: "Yonex",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 3,

          price: 150000,
          brand: "Lining",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 3,

          price: 150000,
          brand: "Lining",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 3,

          price: 130000,
          brand: "Victor",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 4,

          price: 839000,
          brand: "Yonex",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 4,

          price: 789000,
          brand: "Yonex",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 4,

          price: 145000,
          brand: "Kamito",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 4,

          price: 650000,
          brand: "Yonex",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 4,
          price: 699000,
          brand: "Yonex",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 5,

          price: 160000,
          brand: "Victor",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 5,
          price: 270000,
          brand: "Hải Yến",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 5,
          price: 280000,
          brand: "88",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 5,
          price: 245000,
          brand: "Hải Anh",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 5,
          price: 869000,
          brand: "Yonex",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 6,
          price: 120000,
          brand: "Yonex",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 6,

          price: 180000,
          brand: "Felet",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 6,

          price: 60000,
          brand: "Lining",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 6,

          price: 1390000,
          brand: "Head",
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoriesid: 6,

          price: 2590000,
          brand: "Head",
          quantity: 20,
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
    await queryInterface.bulkDelete("products", null, {});
  },
};
