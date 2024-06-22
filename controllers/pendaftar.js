const { Pendaftaran, Umum, Kegiatan } = require("../models");

const view = async (req, res) => {
  const { idKegiatan } = req.params;
  const regis = await Pendaftaran.findAll({
    where: {
      idKegiatan: idKegiatan,
    },
    include: [{
      model: Umum,
      as: 'umum',
      attributes: ['nama', 'nim', 'universitas', 'cv']
    }]
  });

  res.render('pendaftar', { title: "Pendaftar", regis });
};

const setujui = async (req, res) => {
  const { idPendaftaran } = req.params;
  const regis = await Pendaftaran.findByPk(idPendaftaran);
  regis.status = "diterima";
  await regis.save();
  res.redirect(`/ajukan-kegiatan/${regis.idKegiatan}/pendaftar`);
};

const tolak = async (req, res) => {
  const { idPendaftaran } = req.params;
  const regis = await Pendaftaran.findByPk(idPendaftaran);
  await regis.destroy();
  res.redirect(`/ajukan-kegiatan/${regis.idKegiatan}/pendaftar`);
};

module.exports = {
  view,
  setujui,
  tolak,
};
