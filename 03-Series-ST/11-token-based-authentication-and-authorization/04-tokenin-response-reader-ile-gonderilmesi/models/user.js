import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";

const userSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

export const userValidate = (user) => {
   const schema = new Joi.object({
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string().min(3).max(50).required().email(),
      password: Joi.string().min(6).required(),
   });
   return schema.validate(user);
};

export const loginValidate = (user) => {
   const schema = new Joi.object({
      email: Joi.string().min(3).max(50).required().email(),
      password: Joi.string().min(6).required(),
   });
   return schema.validate(user);
};

userSchema.methods.createAuthToken = (user) => {
   return jwt.sign({ _id: user._id }, "jwtPricateKey");
};

export default mongoose.model("User", userSchema);
