"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Promotions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Orders }) {
      // define association here
      this.hasMany(Orders, {
        foreignKey: "promotionid",
      });
    }
  }
  Promotions.init(
    {
      code: DataTypes.STRING,
      description: DataTypes.TEXT,
      type: DataTypes.STRING,
      value: DataTypes.INTEGER,
      min_order_value: DataTypes.INTEGER,
      max_value: DataTypes.INTEGER,
      require_point: DataTypes.INTEGER,
      max_uses: DataTypes.INTEGER,
      used_count: DataTypes.INTEGER,
      userid: DataTypes.INTEGER,
      start: DataTypes.DATE,
      end: DataTypes.DATE,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Promotions",
    }
  );
  return Promotions;
};
