import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();
import User, { userValidate, loginValidate } from "../models/user.js";

router.get("/", async (req, res) => {
   try {
      var users = await User.find();
   } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Bir sorun oluştu " });
   }

   if (users == 0) {
      return res.status(404).send({ message: "Ürün bulunamadı" });
   }

   return res.send(users);
});

router.post("/", async (req, res) => {
   const { error } = userValidate(req.body);

   if (error) {
      return res.status(404).send({ message: error.details[0].message });
   }
   var user = await User.findOne({ email: req.body.email });

   if (user) {
      return res
         .status(400)
         .send({ message: "Bu email adresiyle zaten bir kullanıcı mevcut." });
   }

   const hashedPassword = await bcrypt.hash(req.body.password, 10);

   user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
   });

   try {
      await user.save();
      return res.send(user);
   } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Bir sorun oluştur" });
   }
});

router.post("/auth", async (req, res) => {
   const { error } = loginValidate(req.body);

   if (error) {
      return res.status(400).send({ message: error.details[0].message });
   }

   const user = await User.findOne({ email: req.body.email });

   if (!user) {
      return res.status(400).send({ message: "Hatalı email veya parola" });
   }

   const isSuccess = await bcrypt.compare(req.body.password, user.password);

   if (!isSuccess) {
      return res.status(400).send({ message: "Hatalı email veya parola" });
   }

   return res.send({ message: "Giriş başarılı" });
});

export default router;
