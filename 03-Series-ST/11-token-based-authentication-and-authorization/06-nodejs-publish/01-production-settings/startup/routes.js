import express from "express";
import cors from "cors";
import homeRouter from "../routes/home.js";
import productsRouter from "../routes/products.js";
import categoriesRouter from "../routes/categories.js";
import usersRouter from "../routes/users.js";
import error from "../middleware/error.js";

export default function (app) {
  app.use(express.json());
  app.use(cors());
  app.use("/", homeRouter);
  app.use("/api/products", productsRouter);
  app.use("/api/categories", categoriesRouter);
  app.use("/api/users", usersRouter);
  app.use(error);
}
