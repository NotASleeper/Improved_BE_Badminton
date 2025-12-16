"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Roles, Carts, GRN, Imagesuser, Chats }) {
      // define association here
      this.belongsTo(Roles, {
        foreignKey: "roleid",
      });
      this.hasMany(Carts, {
        foreignKey: "userid",
      });
      this.hasMany(GRN, {
        foreignKey: "userid",
      });
      this.hasOne(Imagesuser, {
        foreignKey: "userid",
      });
      this.hasMany(Chats, {
        foreignKey: "senderid",
      });
    }
  }
  Users.init(
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      gender: DataTypes.STRING,
      address: DataTypes.TEXT,
      phonenumber: DataTypes.STRING,
      loyaltypoint: DataTypes.INTEGER,
      roleid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
