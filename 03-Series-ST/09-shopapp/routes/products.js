import express from "express";
import Product, { productValidate } from "../models/product.js";

const router = express.Router();

// get all
router.get("/", async (req, res) => {
   try {
      // const products = await Product.find();
      // const products = await Product.find({ isActive: true });
      // const products = await Product.find({ isActive: true }).select({ name: 1, price: 1 });
      const products = await Product.find({ isActive: true })
         .limit(3)
         .select({ name: 1, price: 1 });

      res.send(products);
   } catch (error) {
      console.log(error);
   }
});

// new
router.post("/", async (req, res) => {
   const { error } = productValidate(req.body);

   if (error) {
      return res.status(400).send({ message: error.details[0].message });
   }

   const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      isActive: req.body.isActive,
   });

   try {
      product.save();
      return res.send(product);
   } catch (error) {
      console.log(error);
      return res.send({ message: "Ekleme Başarısız" });
   }
});

// update
router.put("/:id", async (req, res) => {
   const id = req.params.id;
   const product = products.filter((product) => product.id == id);

   if (product.length == 0) {
      return res.status(404).send({ message: "Ürün bulunamadı" });
   }

   const { error } = productValidate(req.body);

   if (error) {
      return res.status(400).send({ message: error.details[0].message });
   }
   product[0].name = req.body.name;
   product[0].price = req.body.price;

   return res.send(product[0]);
});

// get one
router.get("/:id", async (req, res) => {
   try {
      const product = await Product.findById(req.params.id);
      res.send(product);
   } catch (error) {
      res.status(404).send({ message: "Ürün bulunamadı" });
   }
});

// delete
router.delete("/:id", (req, res) => {
   const id = req.params.id;
   const product = products.filter((product) => product.id == id);

   if (product.length == 0) {
      return res.status(404).send({ message: "Ürün bulunamadı" });
   }

   const index = products.indexOf(product[0]);

   if (index == -1) {
      return res.status(404).send({ message: "İndex Hatalı" });
   }
   products.splice(index, 1);
   return res.status(200).send({ message: "Ürün silindi" });
});

export default router;
