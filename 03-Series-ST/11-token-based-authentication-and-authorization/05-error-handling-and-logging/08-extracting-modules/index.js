import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";
import categoriesRouter from "./routes/categories.js";
import usersRouter from "./routes/users.js";
import homeRouter from "./routes/home.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import error from "./middleware/error.js";
import config from "config";

// config
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// const p = Promise.reject(new Error("Hata"));
// p.then(() => console.log("success")).catch((error) => console.log(error));

// throw new Error("Uncaught exception ***");

// Router
app.use("/", homeRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/users", usersRouter);
app.use(error);

// start and connect DB
mongoose.connect(process.env.DB_STRING).then(() => {
  console.log("DB connected");
});

app.listen(process.env.PORT || 5000, async () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
