'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    role:{
      type: DataTypes.ENUM,
      values: ['admin', 'umum', 'mahasiswa']
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};