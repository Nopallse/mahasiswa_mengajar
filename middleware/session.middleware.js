const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/login');
};

const isAuthorized = (role) => {
    return (req, res, next) => {
        const userRole = req.session.role;

        if (userRole === role) {
            return next();
        }

        switch (userRole) {
            case 'admin':
                return res.redirect('/admin');
            case 'umum':
            case 'mahasiswa':
                return res.redirect('/user');
            default:
                return res.redirect('/login');
        }
    };
};

module.exports = {
    isAuthenticated,
    isAuthorized
};
