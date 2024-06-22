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
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role:{
      type: DataTypes.ENUM,
      values: ['admin', 'umum', 'mahasiswa']
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE   
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};