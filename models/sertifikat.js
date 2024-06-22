'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sertifikat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sertifikat.belongsTo(models.Pendaftaran, {
        foreignKey: 'idPendaftaran',
        as: 'pendaftaran'
      });
    }
  }
  Sertifikat.init({
    idSertifikat: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idPendaftaran: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Pendaftarans',
        key: 'idPendaftaran'
      }
    },
    judul: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Sertifikat',
  });
  return Sertifikat;
};