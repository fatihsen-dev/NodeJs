import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";
import homeRouter from "./routes/home.js";

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

// Server start
app.listen(3000, () => {
   console.log("Listening on port 3000");
});
