import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Yetkiniz yok.");
  }
  try {
    const decodedToken = jwt.verify(token, "jwtPricateKey");
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).send("Hatalı token");
  }
};
