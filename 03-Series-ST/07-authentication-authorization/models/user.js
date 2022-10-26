const { DataTypes } = require("sequelize");
const squelize = require("../data/db");

const User = squelize.define(
   "user",
   {
      fullname: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   },
   { timestamps: true }
);

module.exports = User;
