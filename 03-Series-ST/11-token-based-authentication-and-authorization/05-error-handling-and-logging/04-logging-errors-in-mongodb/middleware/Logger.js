import { transports, createLogger, format } from "winston";
const { combine, timestamp, prettyPrint } = format;

export const logger = createLogger({
  level: "debug",
  // format: format.json(),
  format: combine(
    timestamp({
      format: "MM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs.log" }),
  ],
});
