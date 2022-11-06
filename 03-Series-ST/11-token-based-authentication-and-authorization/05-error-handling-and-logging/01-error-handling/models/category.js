import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const categorySchema = mongoose.Schema({
   name: String,
   products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

export const categoryValidate = (product) => {
   const schema = new Joi.object({
      name: Joi.string().min(3).max(30).required(),
      products: Joi.array(),
   });
   return schema.validate(product);
};

export default mongoose.model("category", categorySchema);
