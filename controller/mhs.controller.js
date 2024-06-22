const { User } = require('../models');

const getMhs = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).send('Unauthorized');
        }

        const Mhs = await User.findOne({ where: { id: req.session.userId } });
        if (!Mhs) {
            return res.status(401).send('Unauthorized');
        }

        res.render('Mhs',  { Mhs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan pada server');
    }
};

module.exports = {
    getMhs
}