import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
   name: String,
});

export default mongoose.model("category", categorySchema);
