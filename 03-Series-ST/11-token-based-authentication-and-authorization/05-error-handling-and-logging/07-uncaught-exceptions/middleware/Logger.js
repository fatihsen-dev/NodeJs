import { transports, createLogger, format } from "winston";
const { combine, timestamp, prettyPrint } = format;
import "winston-mongodb";

export const logger = createLogger({
  level: "debug",
  format: combine(
    timestamp({
      format: "MM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "logs/logs.log",
      level: "error",
      maxFiles: "3d",
    }),
    new transports.File({
      filename: "logs/exceptions.log",
      level: "error",
      handleExceptions: true,
      handleRejections: true,
      maxFiles: "3d",
    }),
    new transports.MongoDB({
      level: "error",
      db: "mongodb+srv://fatihsen:102030@cluster0.ryed3tf.mongodb.net/shopdb?retryWrites=true&w=majority",
      options: {
        useUnifiedTopology: true,
      },
      collection: "server_log",
    }),
  ],
});

/*
process.on("uncaughtException", (error) => {
  console.log(error.message);
  logger.error(error.message);
});

process.on("unhandledrejection", (error) => {
  console.log(error.message);
  logger.error(error.message);
});
*/
