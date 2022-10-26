const express = require("express");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
   session({
      secret: "hello world",
      resave: false,
      saveUninitialized: false,
      cookie: {
         maxAge: 1000 * 60 * 60 * 24,
      },
   })
);

app.use(express.static("node_modules"));
app.use(express.static("public"));
app.use("/admin", adminRoutes);
app.use("/account", authRoutes);

app.use(userRoutes);

const Blog = require("./models/blog");
const Category = require("./models/category");
const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data");
const User = require("./models/user");

Blog.belongsTo(User, {
   foreignKey: {
      allowNull: true,
   },
});
User.hasMany(Blog);

Blog.belongsToMany(Category, { through: "blogCategories" });
Category.belongsToMany(Blog, { through: "blogCategories" });

const sync = async () => {
   await sequelize.sync({ force: true });
   await dummyData();
};
sync();

app.listen(3000, () => {
   console.log("Listining on port http://localhost:3000/");
});
