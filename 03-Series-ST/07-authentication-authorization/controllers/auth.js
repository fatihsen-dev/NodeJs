const User = require("../models/user");
const bcrypt = require("bcrypt");

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

   console.log(name, email, password);
   try {
      await User.create({
         fullname: name,
         email: email,
         password: hashedPassword,
      });

      return res.redirect("login");
   } catch (error) {
      console.log(error);
   }
};

exports.get_login = async (req, res) => {
   try {
      return res.render("auth/login", { title: "Login" });
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
         return res.render("auth/login", { title: "Login", message: "Email hatalı" });
      }

      const match = await bcrypt.compare(password, user.password);

      if (match) {
         req.session.isAuth = 1;

         return res.redirect("/");
      }

      return res.render("auth/login", { title: "Login", message: "Parola hatalı" });
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
