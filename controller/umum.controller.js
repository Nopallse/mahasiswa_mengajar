const { User } = require('../models');

const getUmum = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).send('Unauthorized');
        }

        const umum = await User.findOne({ where: { id: req.session.userId } });
        if (!umum) {
            return res.status(401).send('Unauthorized');
        }

        res.render('umum',  { umum });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan pada server');
    }
};

module.exports = {
    getUmum,
}