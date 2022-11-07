import express from "express";
import dotenv from "dotenv";
import routes from "./startup/routes.js";
import db from "./startup/db.js";
import productions from "./startup/productions.js";
dotenv.config();
const app = express();

if (process.env.Node_ENV == "production") {
  productions(app);
}
routes(app);
db();

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
});
