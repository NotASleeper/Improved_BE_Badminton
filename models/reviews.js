"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users, Products, Orders }) {
      // define association here
      this.belongsTo(Users, {
        foreignKey: "userid",
      });
      this.belongsTo(Products, {
        foreignKey: "productid",
      });
      this.belongsTo(Orders, {
        foreignKey: "orderid",
      });
      this.belongsTo(Reviews, {
        foreignKey: "prereviewid",
        as: "prereview",
      });
    }
  }
  Reviews.init(
    {
      userid: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      toxicscore: DataTypes.FLOAT,
      status: DataTypes.STRING,
      productid: DataTypes.INTEGER,
      orderid: DataTypes.INTEGER,
      prereviewid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Reviews",
    }
  );
  return Reviews;
};
