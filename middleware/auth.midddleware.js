exports.LoginRequire = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}
exports.NoLogin = (req, res, next) => {
    if (!req.session.user) {
        next();
    } else {
        res.redirect('/admin/');
    }
}