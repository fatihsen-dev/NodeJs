import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";
import categoriesRouter from "./routes/categories.js";
import usersRouter from "./routes/users.js";
import homeRouter from "./routes/home.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

// config
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// router
app.use("/", homeRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/users", usersRouter);

// start and connect db
(async () => {
   try {
      await mongoose.connect(process.env.DB_STRING);
      console.log("DB connected");
   } catch (error) {
      console.log(error);
   }
})();
app.listen(process.env.PORT || 5000, async () => {
   console.log(`Listening on port ${process.env.PORT}`);
});
