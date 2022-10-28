module.exports = (req, res, next) => {
   if (!req.session.isAuth) {
      return res.redirect("/account/login?returnurl=" + req.originalUrl);
   }
   next();
};
