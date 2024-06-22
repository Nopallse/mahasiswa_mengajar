const bcrypt = require('bcrypt');
const { User } = require('../models');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).render('login', { message: 'Invalid username or password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).render('login', { message: 'Invalid username or password' });
        }

        req.session.userId = user.id;
        req.session.role = user.role;

        switch (user.role) {
            case 'admin':
                return res.redirect('/admin');
            case 'umum':
            case 'mahasiswa':
                return res.redirect('/user');
            default:
                return res.redirect('/login');
        }
    } catch (error) {
        return res.status(500).render('login', { message: 'Internal Server Error' });
    }
};

// Proses logout
const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).redirect('/');
        }
        res.redirect('/login');
    });
};

module.exports = {
    login,
    logout
}