const {Umum, Pendaftaran} = require('../models');
const moment = require('moment');

const getUmum = async (req, res) => {
    try {
        const umum = await Umum.findOne({where: {idUser: req.session.userId}});
        if(!umum) {
            return res.redirect('/error');
        }

        const ikut = await Pendaftaran.findAll({where: {nikUmum: umum.nik}});

        res.render('profile', {title: 'Profile', umum, ikut, moment: moment,});
    } catch (error) {
        console.log(error);
    }
}

const fillMhs = async (req, res) => {
    const { universitas, nim} = req.body;
    try {
        const umum = await Umum.findOne({where: {idUser: req.session.userId}});
        if(!umum) {
            return res.redirect('/error');
        }

        const noNik = umum.nik;
            const cvSlug = req.file.filename;

        if (umum.cv) {
            const oldPhotoPath = `uploads/${umum.foto}`;
            fs.unlink(oldPhotoPath, (err) => {
                if (err) {
                    console.error('Error deleting old photo:', err);
                }
            });
        }


    addData = await Umum.update(
        {
            nim: nim,
            universitas: universitas,
            cv: cvSlug,
        },
        {where: {nik: noNik}}
    );

        res.redirect('/profile');
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getUmum,
    fillMhs,
}