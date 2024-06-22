const { Kegiatan, Umum, Pendaftaran} = require('../models')



const generateSertifikat = async (req, res) => {
    try {
        const kegiatan = await Kegiatan.findByPk(req.params.id);
        if (!kegiatan) {
            return res.status(404).send("Kegiatan not found");
        }
        const umum = await Umum.findOne({where:{idUser: req.session.userId}});
 
        const pendaftaran = await Pendaftaran.findOne({
            where:{
                idKegiatan: req.params.id,
                nikUmum: umum.nik
            }
        });

        console.log("ini adalah pendaftaran: ",pendaftaran);

        res.render('generateSertifikat', {
            pendaftaran,
            kegiatan,
            title: 'Detail Kegiatan'
        });
    } catch (error) {
        console.error("Error fetching kegiatan:", error);
        res.status(500).send("Internal Server Error");
    }
}