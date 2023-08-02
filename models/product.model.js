import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    cover: {
      type: String,
      required: false,
    },
    img: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    catCat: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: false,
    },
    seccion: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
