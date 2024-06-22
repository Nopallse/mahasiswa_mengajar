const { Umum, Kegiatan } = require('../models');

const dashboard = async (req, res, next) => {


    res.render('admin/dash', { title: 'Transkrip Nilai' });
    
};

const daftarPengajuan = async (req, res, next) => {
    const pengajuans = await Kegiatan.findAll({
        attributes: ['idKegiatan', 'judul', 'status', 'namaSekolah', 'lokasi'],

        include: {
            model: Umum,
            as: 'umum',
            attributes: ['nik', 'nama']
        }
    });
    console.log(pengajuans);
    res.render('admin/daftar_pengajuan', { title: 'Daftar Pengajuan', pengajuans });
};

const lihatPengajuan = async (req, res, next) => {
    try {
        const idKegiatan = req.params.idKegiatan;
        if (!req.params.idKegiatan) {
            return res.status(400).json({ message: 'idKegiatan tidak boleh kosong' });
        }

        const pengajuan = await Kegiatan.findOne({
            attributes: ['idKegiatan', 'judul', 'gambar', 'deskripsi', 'npsn', 'namaSekolah', 'lokasi',  'kuotaRelawan', 'mulai', 'selesai'
                , 'status', 'dokumen', 'createdAt', 'updatedAt'
            ],
            where: {
                idKegiatan
            },
            include: {
                model: Umum,
                as: 'umum',
                attributes: ['nik', 'nim', 'nama', 'tanggalLahir', 'alamat', 'cv', 'universitas']
            }
        });

        if (!pengajuan) {
            return res.status(404).json({ message: 'Kegiatan tidak ditemukan' });
        }

        res.render('admin/lihat_pengajuan', { title: 'Pengajuan', pengajuan });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const terimaKegiatan = async (req, res, next) => {
    try {
        const idKegiatan = req.params.idKegiatan;
        if (!req.params.idKegiatan) {
            return res.status(400).json({ message: 'idKegiatan tidak boleh kosong' });
        }


        const kegiatan = Kegiatan.update({
            status: 'diterima'
        }, {
            where: {
                idKegiatan
            }
        })

        if(kegiatan == 0){
            return res.status(404).json({ message: 'Kegiatan tidak ditemukan' });
        }


        res.redirect('/admin/daftar-pengajuan');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const tolakKegiatan = async (req, res, next) => {
    try {
        const idKegiatan = req.params.idKegiatan;
        if (!req.params.idKegiatan) {
            return res.status(400).json({ message: 'idKegiatan tidak boleh kosong' });
        }
    
        const kegiatan = Kegiatan.update({
            status: 'ditolak'
        }, {
            where: {
                idKegiatan
            }
        })

        if(kegiatan == 0){
            return res.status(404).json({ message: 'Kegiatan tidak ditemukan' });
        }

        res.redirect('/admin/daftar-pengajuan');

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}



module.exports = {
    dashboard,
    daftarPengajuan,
    lihatPengajuan,
    terimaKegiatan,
    tolakKegiatan
}