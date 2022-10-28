const User = require("../models/user");
const bcrypt = require("bcrypt");
const emailService = require("../helpers/send-mail");
const config = require("../config");

exports.get_register = async (req, res) => {
   try {
      return res.render("auth/register", { title: "Register" });
   } catch (error) {
      console.log(error);
   }
};
exports.post_register = async (req, res) => {
   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;

   const hashedPassword = await bcrypt.hash(password, 10);
   try {
      const user = await User.findOne({ where: { email: email } });

      if (user) {
         req.session.message = {
            text: "Girdiğiniz email adresiyle daha önce kayıt olunmuş.",
            class: "warning",
         };
         return res.redirect("login");
      }

      const newUser = await User.create({
         fullname: name,
         email: email,
         password: hashedPassword,
      });

      emailService.sendMail({
         from: config.email.from,
         to: newUser.email,
         subject: "Hesabınız oluşturuldu.",
         text: "Hesabınız başarılı şekilde oluşturuldu.",
      });

      req.session.message = {
         text: "Hesabınıza giriş yapabilirsiniz.",
         class: "success",
      };
      return res.redirect("login");
   } catch (error) {
      console.log(error);
   }
};

exports.get_login = async (req, res) => {
   const message = req.session.message;
   delete req.session.message;
   try {
      return res.render("auth/login", { title: "Login", message: message });
   } catch (error) {
      console.log(error);
   }
};
exports.post_login = async (req, res) => {
   const email = req.body.email;
   const password = req.body.password;

   try {
      const user = await User.findOne({
         where: {
            email: email,
         },
      });

      console.log(user);

      if (!user) {
         return res.render("auth/login", {
            title: "Login",
            message: {
               text: "Email hatalı",
               class: "danger",
            },
         });
      }

      const match = await bcrypt.compare(password, user.password);

      if (match) {
         req.session.isAuth = true;
         req.session.fullname = user.fullname;

         const url = req.query.returnurl || "/";
         return res.redirect(url);
      }

      return res.render("auth/login", {
         title: "Login",
         message: {
            text: "Parola hatalı",
            class: "danger",
         },
      });
   } catch (error) {
      console.log(error);
   }
};

exports.get_logout = async (req, res) => {
   try {
      await req.session.destroy();
      return res.redirect("/account/login");
   } catch (error) {
      console.log(error);
   }
};
