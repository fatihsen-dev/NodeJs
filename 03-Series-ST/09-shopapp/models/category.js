import mongoose from "mongoose";
import Joi from "joi";

const categorySchema = mongoose.Schema({
   name: String,
});

export const categoryValidate = (product) => {
   const schema = new Joi.object({
      name: Joi.string().min(3).max(30).required(),
   });
   return schema.validate(product);
};

export default mongoose.model("category", categorySchema);
