import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const commentSchema = mongoose.Schema({
   text: String,
   username: String,
   date: {
      type: Date,
      default: Date.now,
   },
});

const productSchema = mongoose.Schema({
   name: String,
   price: Number,
   description: String,
   imageUrl: String,
   date: {
      type: Date,
      default: Date.now,
   },
   isActive: Boolean,
   category: {
      type: Schema.Types.ObjectId,
      ref: "category",
   },
   comments: [commentSchema],
});

export const productValidate = (product) => {
   const schema = new Joi.object({
      name: Joi.string().min(3).max(30).required(),
      price: Joi.number().required(),
      description: Joi.string().min(8).max(200).required(),
      imageUrl: Joi.string().min(2).max(200).required(),
      isActive: Joi.boolean().required(),
      category: Joi.string(),
      comments: Joi.array(),
   });
   return schema.validate(product);
};

export default mongoose.model("Product", productSchema);
