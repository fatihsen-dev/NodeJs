import helmet from "helmet";
import compression from "compression";

export default function (app) {
  app.use(helmet());
  app.use(compression());
}
