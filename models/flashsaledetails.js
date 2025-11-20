'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flashsaledetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Flashsaledetails.init({
    flashsaleid: DataTypes.INTEGER,
    productid: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    max_uses: DataTypes.INTEGER,
    used_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Flashsaledetails',
  });
  return Flashsaledetails;
};