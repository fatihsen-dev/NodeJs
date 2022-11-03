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

// exress cors middleware
// app.use((req, res, next) => {
//    res.setHeader("Access-Control-Allow-Orign", "*");
//    res.setHeader("Access-Control-Allow-Methods", "GET");
//    next();
// });

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

const productSchema = mongoose.Schema({
   name: String,
   price: Number,
   description: String,
   imageUrl: String,
   date: {
      type: Date,
      default: Date.now,
   },
   isActive: Boolean,
});

const Product = mongoose.model("Product", productSchema);

const prd = new Product({
   name: "İphone 11",
   price: 10000,
   description: "Gayet güzel bir telefon",
   imageUrl: "1.jpeg",
   isActive: true,
});
(async () => {
   try {
      const product = await prd.save();
      console.log(product);
   } catch (error) {
      console.log(error);
   }
})();

// Server start
app.listen(process.env.PORT || 5000, async () => {
   console.log("Listening on port 3000");
});
