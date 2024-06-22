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
      type: DataTypes.INTEGER
    },
    idKegiatan: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Kegiatans',
        key: 'idKegiatan'
      }
    },
    nimMahasiswa: {
      allowNull: false,
      type:DataTypes.STRING,
      references: {
        model: 'Mahasiswas',
        key: 'nim'
      }
    },
    status: {
      type:DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Pendaftaran',
  });
  return Pendaftaran;
};