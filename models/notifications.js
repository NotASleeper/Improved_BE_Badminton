'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notifications.init({
    userid: DataTypes.INTEGER,
    type: DataTypes.STRING,
    messagekey: DataTypes.STRING,
    relatedid: DataTypes.INTEGER,
    isread: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Notifications',
  });
  return Notifications;
};