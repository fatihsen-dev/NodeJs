export default function (req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).send({ message: "Erişim yetkiniz yok" });
  }
  next();
}
