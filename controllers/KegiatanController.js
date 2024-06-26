
const { where } = require('sequelize');
const { Kegiatan, Umum, Pendaftaran} = require('../models')
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const libre = require("libreoffice-convert");


const getKegiatan = async (req, res) => {
    try {
        const kegiatanList = await Kegiatan.findAll({
            where: {
                status: 'diterima'
            }
        });
        if(req.session.userId){

            const umum = await Umum.findOne({where:{idUser: req.session.userId}});

            res.render('homeUser', { title: 'Beranda',  kegiatanList, umum, moment});
        }

        res.render('home', {
            kegiatanList,
            title: 'Beranda',
            moment
        });
    } catch (error) {
        console.error("Error fetching kegiatan:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getKegiatanku = async (req, res) => {
    try {
        const umum = await Umum.findOne({where:{idUser: req.session.userId}});

        const pendaftaranList = await Pendaftaran.findAll({
            where: {
                nikUmum: umum.nik
            },
            include: [
                {
                    model: Kegiatan,
                    as: 'kegiatan'
                }
            ]
        });

        res.render('User/kegiatanku', {
            pendaftaran: pendaftaranList,
            umum,
            title: 'Kegiatanku',
            moment
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
        const umum = await Umum.findOne({where:{idUser: req.session.userId}});
 
        const pendaftaran = await Pendaftaran.findOne({
            where:{
                idKegiatan: req.params.id,
                nikUmum: umum.nik
            }
        });

        console.log("ini adalah pendaftaran: ",pendaftaran);

        res.render('detailKegiatan', {
            pendaftaran,
            kegiatan,
            title: 'Detail Kegiatan',
            moment
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

const download = async (req, res) => {
    try {
        const umum = await Umum.findOne({where:{idUser: req.session.userId}});

        const pendaftaranList = await Pendaftaran.findOne({
            where: {
                nikUmum: umum.nik
            },
            include: [
                {
                    model: Kegiatan,
                    as: 'kegiatan'
                }
            ]
        });

        let templatePath = path.resolve(
            "public/template",
            `template.docx`
          );
          const content = fs.readFileSync(templatePath);
          const zip = new PizZip(content);
        //   const imageOpts = {
        //     centered: false,
        //     getImage: (tagValue) => fs.readFileSync(tagValue),
        //     getSize: () => [120, 120],
        //   };

        //   const imageModule = new ImageModule(imageOpts);
    const doc = new Docxtemplater(zip, {
    //   modules: [imageModule],
      paragraphLoop: true,
      linebreaks: true,
    });

    // const date = new Date(pengajuan.umum.tanggalLahir).toLocaleDateString() 
    // mulai - selesai 
    const startDate = moment(pendaftaranList.kegiatan.mulai).format('DD MMMM YYYY');
    const endDate = moment(pendaftaranList.kegiatan.selesai).format('DD MMMM YYYY');
    const tanggal = `${startDate} - ${endDate}`;
    
    console.log("ini adalah umum: ", umum.nama);
    console.log("ini adalah pendaftaran: ", pendaftaranList.kegiatan.judul);
    
    doc.setData({
        nama: umum.nama,
        kegiatan: pendaftaranList.kegiatan.judul,
        tanggal: tanggal,
    });
      doc.render();
      const buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
      });
  
      const fileName = `sertifikat.docx`;
      const userDir = path.resolve("public", `sertifikat`);
      const outputPath = path.join(userDir, fileName);
  
      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
      }
  
      fs.writeFileSync(outputPath, buf);
  
      const now = new Date();
      const datetimeStamp = now.toISOString().replace(/[-:]/g, "").split(".")[0]; // Format: YYYYMMDDTHHMMSS
  
      // Create the pdf path with datetime stamp
      const pdfFilename = `Sertifikat (${datetimeStamp}).pdf`;
      const pdfDir = path.resolve("public", "sertifikat");
      const pdfPath = path.join(
        pdfDir,
        pdfFilename
      );
  
      
      
  
      if (!fs.existsSync(pdfDir)) {
        fs.mkdirSync(pdfDir, { recursive: true });
      }
  
      libre.convert(
        fs.readFileSync(outputPath),
        "pdf",
        undefined,
        async (err, result) => {
          if (err) {
            console.error("Error converting DOCX to PDF:", err);
            return res.status(500).send("Error converting DOCX to PDF");
          }
  
          fs.writeFileSync(pdfPath, result);
          console.log("File converted successfully");
      
          await fs.promises.unlink(outputPath);
  
          res.download(pdfPath, pdfFilename, async (err) => {
            if (err) {
                console.error("Error downloading the file:", err);
                return res.status(500).send("Error downloading the file");
            }

            // Optionally, delete the PDF file after sending it to the client
            await fs.promises.unlink(pdfPath);
        });
    });
    } catch (error) {
        console.error("Error fetching kegiatan:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { getKegiatan , detailKegiatan, daftarKegiatan,getKegiatanku,download};
