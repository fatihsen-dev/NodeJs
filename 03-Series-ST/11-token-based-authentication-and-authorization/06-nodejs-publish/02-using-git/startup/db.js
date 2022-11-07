import mongoose from "mongoose";
import { logger } from "./Logger.js";

export default function () {
  mongoose.connect(process.env.DB_STRING).then(() => {
    logger.info("DB connected");
  });
}
