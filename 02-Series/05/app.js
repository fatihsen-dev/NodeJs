const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const dbUrl =
  "mongodb+srv://fatih:12345@nodeblog.ur3vyrw.mongodb.net/node-blog?retryWrites=true&w=majority";

mongoose
  .connect(dbUrl)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cookieParser());

app.get("*", checkUser);
app.get("/", (req, res) => {
  res.redirect("/blog");
});
app.use("/", authRoutes);
app.use("/admin", requireAuth, adminRoutes);
app.use("/blog", blogRoutes);

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/about-us", (req, res) => {
  res.redirect("about");
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
