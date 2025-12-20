"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flashsales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Flashsaledetails }) {
      // define association here
      this.hasMany(Flashsaledetails, { foreignKey: "flashsaleid" });
    }
  }
  Flashsales.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      start: DataTypes.DATE,
      end: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Flashsales",
    }
  );
  return Flashsales;
};
