"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flashsaledetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Flashsales, Products }) {
      // define association here
      this.belongsTo(Flashsales, { foreignKey: "flashsaleid" });
      this.belongsTo(Products, { foreignKey: "productid" });
    }
  }
  Flashsaledetails.init(
    {
      flashsaleid: DataTypes.INTEGER,
      productid: DataTypes.INTEGER,
      type: DataTypes.INTEGER, //0: percentage, 1: fixed amount
      value: DataTypes.INTEGER,
      max_uses: DataTypes.INTEGER,
      used_count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Flashsaledetails",
    }
  );
  return Flashsaledetails;
};
