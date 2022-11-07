import express from "express";
import dotenv from "dotenv";
import routes from "./startup/routes.js";
import db from "./startup/db.js";
dotenv.config();
const app = express();

routes(app);

db();

app.listen(process.env.PORT || 5000, async () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
