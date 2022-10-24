const express = require("express");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(express.static("node_modules"));
app.use(express.static("public"));
app.use("/admin", adminRoutes);
app.use(userRoutes);

const Blog = require("./models/blog");
const Category = require("./models/category");
const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data");

// one to many
// Category.hasMany(Blog, {
//    foreignKey: {
//       name: "categoryId",
//       allowNull: true,
//       // defaultValue: 1,
//    },
//    onDelete: "SET NULL",
//    onUpdate: "SET NULL",
// });
// Blog.belongsTo(Category);

Blog.belongsToMany(Category, { through: "blogCategories" });
Category.belongsToMany(Blog, { through: "blogCategories" });

const sync = async () => {
   await sequelize.sync({ alter: true });
   await dummyData();
};
sync();

app.listen(3000, () => {
   console.log("Listining on port http://localhost:3000/");
});
