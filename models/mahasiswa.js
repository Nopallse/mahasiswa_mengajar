'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mahasiswa.belongsTo(models.User, {
        foreignKey: 'idUser',
        as: 'user'
      });
      Mahasiswa.hasMany(models.Pendaftaran, {
        foreignKey: 'nimMahaasiswa',
        as: 'pendaftaran'
      });
    }
  }
  Mahasiswa.init({
    nim: {  
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.STRING
    },
    idUser: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    nama: {
      type: DataTypes.STRING
    },
    tanggalLahir: {
      type: DataTypes.DATE
    },
    alamat: {
      type: DataTypes.STRING
    },
    cv: {
      type: DataTypes.STRING
    },
    universitas: {
      type: DataTypes.STRING
    }, 
  },
  {
    sequelize,
    modelName: 'Mahasiswa',
  });
  return Mahasiswa;
};