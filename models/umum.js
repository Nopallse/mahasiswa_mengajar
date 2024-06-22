'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Umum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Umum.hasOne(models.User, {
        foreignKey: 'id',
        as: 'user',
      });
      Umum.hasMany(models.Kegiatan, {
        foreignKey: 'nikUmum',
        as: 'kegiatan',
      });
    }
  }
  Umum.init({
    nik:{
      type: DataTypes.STRING,
      primaryKey: true
    },
    nama: DataTypes.STRING,
    alamat: DataTypes.DATE,
    phone: DataTypes.STRING,
    idUser: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'Umum',
  });
  return Umum;
};