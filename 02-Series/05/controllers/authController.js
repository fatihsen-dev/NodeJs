const User = require("../models/users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const maxAge = 60 * 60 * 24; // 1 Day
const createToken = (id) => {
  return jwt.sign({ id }, "pswd", { expiresIn: maxAge });
};

const login_get = (req, res) => {
  res.render("login", { title: "Login" });
};
const login_post = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (err, data) => {
    if (err) {
      console.log("Kullanıcı bulunamadı.");
    }
    if (data) {
      const test = bcrypt
        .compare(password, data.password)
        .then((result) => {
          if (result) {
            const token = createToken(data._id);
            res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.redirect("/admin");
          } else {
            console.log("Şifre Yanlış.");
            res.redirect("/login");
          }
        })
        .catch((err) => console.log(err));
    }
  });
};
const signup_get = (req, res) => {
  res.render("signup", { title: "Sign up" });
};
const signup_post = (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      console.log(err);
    }
    const user = new User({
      username: req.body.username,
      password: hash,
    });
    user
      .save()
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => console.error(err));
  });
};
const logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/login");
};

module.exports = {
  login_get,
  login_post,
  signup_get,
  signup_post,
  logout_get,
};
