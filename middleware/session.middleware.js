const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/login');
};

const isAuthorized = (role) => {
    return (req, res, next) => {
        if (req.session.role === role) {
            return next();
        }
        res.redirect('/');
    };
};

module.exports = {
    isAuthenticated,
    isAuthorized,
}