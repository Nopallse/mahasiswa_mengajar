'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pendaftaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pendaftaran.belongsTo(models.Mahasiswa, {
        foreignKey: 'nimMahasiswa',
        as: 'mahasiswa'
      });
      Pendaftaran.belongsTo(models.Kegiatan, {
        foreignKey: 'idKegiatan',
        as: 'kegiatan'
      });   
      Pendaftaran.hasOne(models.Sertifikat, {
        foreignKey: 'idPendaftaran',
        as: 'sertifikat'
      });
    }
  }
  Pendaftaran.init({
    idPendaftaran: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    idKegiatan: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'Kegiatans',
        key: 'idKegiatan'
      }
    },
    nimMahasiswa: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.STRING,
      references: {
        model: 'Mahasiswas',
        key: 'nim'
      }
    },
    status: {
      type: Sequelize.STRING
    },
  }, {
    sequelize,
    modelName: 'Pendaftaran',
  });
  return Pendaftaran;
};