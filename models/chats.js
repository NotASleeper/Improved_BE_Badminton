"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users }) {
      // define association here
      this.belongsTo(Users, { foreignKey: "senderid", as: "sender" });
    }
  }
  Chats.init(
    {
      room: DataTypes.STRING,
      senderid: DataTypes.INTEGER,
      senderrole: DataTypes.STRING,
      content: DataTypes.TEXT,
      productid: DataTypes.INTEGER,
      isread: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Chats",
    }
  );
  return Chats;
};
