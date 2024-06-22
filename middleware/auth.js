const bcrypt = require("bcrypt");
const { User } = require("../models");
var session = require('express-session');

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Debug logging
        console.log("Login attempt:", email);

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.redirect('/auth'); // Redirect to login page
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.redirect('/auth'); // Redirect to login page
        }

        // Set session
        req.session.userId = user.id;
        req.session.userRole = user.role;
        console.log("Login successful for user:", email);
        if (user.id == "1") {
            return res.redirect("/");
        } else if (user.id == "2") {
            return res.redirect("/admin/dashboard");
        }
    } catch (error) {
        console.error("Login error:", error);
        next(error);
    }
};

const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/auth'); // Redirect to login page
    }
    next();
};
const redirectIfAuthenticated = (req, res, next) => {
    if (req.session.userRole==='mahasiswa') {
        return res.redirect('/'); // Redirect to home page if authenticated
    }
    next();
};
const logout = (req, res, next) => {
    // Hapus data sesi yang relevan
    req.session.destroy((err) => {
        if (err) {
            console.error("Error while logging out:", err);
            return next(err);
        }
        // Redirect pengguna ke halaman login setelah logout
        res.redirect('/auth');
    });
};

module.exports = { login, requireAuth,redirectIfAuthenticated,logout };
