import express from "express";
import Product, { productValidate } from "../models/product.js";
const router = express.Router();

router.get("/", async (req, res) => {
   try {
      const products = await Product.find()
         .populate("category", "name -_id")
         .select("-isActive -comments._id -comments.date");
      res.send(products);
   } catch (error) {
      console.log(error);
   }
});

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
      category: req.body.category,
      comments: req.body.comments,
   });

   try {
      product.save();
      return res.send(product);
   } catch (error) {
      console.log(error);
      return res.send({ message: "Ekleme Başarısız" });
   }
});

router.put("/:id", async (req, res) => {
   const { error } = productValidate(req.body);

   if (error) {
      return res.status(400).send({ message: error.details[0].message });
   }

   try {
      const product = await Product.findById(req.params.id);
      product.name = req.body.name;
      product.price = req.body.price;
      product.description = req.body.description;
      product.imageUrl = req.body.imageUrl;
      product.isActive = req.body.isActive;
      product.category = req.body.category;
      product.comments = req.body.comments;
      try {
         const updateProduct = await product.save();
         return res.send(updateProduct);
      } catch (error) {
         console.log(error);
         return res.status(500).send({ message: "Güncelleme başarısız" });
      }
   } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Ürün bulunamadı" });
   }
});

router.get("/:id", async (req, res) => {
   try {
      const product = await Product.findById(req.params.id);
      res.send(product);
   } catch (error) {
      res.status(404).send({ message: "Ürün bulunamadı" });
   }
});

router.delete("/:id", async (req, res) => {
   const product = await Product.findByIdAndDelete(req.params.id);

   if (!product) {
      return res.status(404).send({ message: "Ürün bulunamadı" });
   }
   res.send(product);
});

export default router;
