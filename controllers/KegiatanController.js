
const { where } = require('sequelize');
const { Kegiatan, Umum, Pendaftaran} = require('../models')


const getKegiatan = async (req, res) => {
    try {
        const kegiatanList = await Kegiatan.findAll({
            where: {
                status: 'diterima'
            }
        });
        if(req.session.userId){

            const umum = await Umum.findOne({where:{idUser: req.session.userId}});

            res.render('homeUser', { title: 'Beranda',  kegiatanList, umum});
        }

        res.render('home', {
            kegiatanList,
            title: 'Beranda'
        });
    } catch (error) {
        console.error("Error fetching kegiatan:", error);
        res.status(500).send("Internal Server Error");
    }
};

const detailKegiatan = async (req, res) => {
    try {
        const kegiatan = await Kegiatan.findByPk(req.params.id);
        if (!kegiatan) {
            return res.status(404).send("Kegiatan not found");
        }
        res.render('detailKegiatan', {
            kegiatan,
            title: 'Detail Kegiatan'
        });
    } catch (error) {
        console.error("Error fetching kegiatan:", error);
        res.status(500).send("Internal Server Error");
    }
}

const daftarKegiatan = async (req, res) => {
    try {
        const kegiatan = await Kegiatan.findByPk(req.params.id);

        const user = await Umum.findOne({
            where:{
                idUser: req.session.userId
            }
        });
        console.log("ini adalah user nim: ",user.nim);
        if(!user.nim){
            return res.redirect('/profile');
        }
        const pendaftaran = await Pendaftaran.create({
            idKegiatan: kegiatan.idKegiatan,
            nikUmum: user.nik,
            status: 'menunggu'
        });


        if (!kegiatan) {
            return res.status(404).send("Kegiatan not found");
        }
        res.redirect('/home');
    } catch (error) {
        console.error("Error fetching kegiatan:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { getKegiatan , detailKegiatan, daftarKegiatan};
