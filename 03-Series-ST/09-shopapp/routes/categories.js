import express from "express";
import Category, { categoryValidate } from "../models/category.js";

const router = express.Router();

router.get("/", async (req, res) => {
   const categories = await Category.find();

   if (!categories || categories.length == 0) {
      return res.status(404).send({ message: "Kategori bulunamadı" });
   }
   return res.send(categories);
});

router.get("/:id", async (req, res) => {
   const id = req.params.id;

   try {
      const category = await Category.findById(id);

      return res.send(category);
   } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Bir hata oluştu" });
   }
});

router.post("/", async (req, res) => {
   const { error } = categoryValidate(req.body);

   if (error) {
      return res.status(404).send({ message: error.details[0].message });
   }
   try {
      const category = await Category({
         name: req.body.name,
      });

      try {
         await category.save();
         return res.send(category);
      } catch (error) {
         console.log(error);
         return res.status(500).send({ message: "Kategori eklenemedi" });
      }
   } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Bir sorun oluştu" });
   }
});

router.delete("/:id", async (req, res) => {
   const id = req.params.id;

   try {
      const category = await Category.findByIdAndDelete(id);
      return res.send(category);
   } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Kategori bulunamadı" });
   }
});

router.put("/:id", async (req, res) => {
   const id = req.params.id;
   const { error } = categoryValidate(req.body);

   if (error) {
      res.status(404).send({ message: error.details[0].message });
   }

   try {
      const category = await Category.findByIdAndUpdate(
         id,
         {
            name: req.body.name,
         },
         { new: true }
      );
      return res.send(category);
   } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Kategori Güncellenemedi" });
   }
});

export default router;
