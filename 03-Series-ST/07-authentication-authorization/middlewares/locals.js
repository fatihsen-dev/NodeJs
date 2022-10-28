module.exports = (req, res, next) => {
   res.locals.isAuth = req.session.isAuth;
   res.locals.fullname = req.session.fullname;
   next();
};
