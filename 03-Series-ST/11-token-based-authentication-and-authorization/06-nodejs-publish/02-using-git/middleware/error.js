import { logger } from "../startup/Logger.js";

export default (err, req, res, next) => {
  logger.error(err.message);
  res.status(500).send({ message: "Hata oluştu." });
};
