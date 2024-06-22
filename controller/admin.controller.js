const { User } = require('../models');

const getAdmin = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).send('Unauthorized');
        }

        const admin = await User.findOne({ where: { id: req.session.userId } });
        if (!admin) {
            return res.status(401).send('Unauthorized');
        }

        res.render('admin',  { admin });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan pada server');
    }
};

module.exports = {
    getAdmin,
}