import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";
import homeRouter from "./routes/home.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/", homeRouter);
app.use("/api/products", productsRouter);

// connect db
(async () => {
   try {
      await mongoose.connect(process.env.DB_STRING);
      console.log("DB connected");
   } catch (error) {
      console.log(error);
   }
})();

// Server start
app.listen(process.env.PORT || 5000, async () => {
   console.log(`Listening on port ${process.env.PORT}`);
});
