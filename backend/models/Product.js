const mongoose = require("mongoose");
const validator = require("validator");

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  image_preview: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: "Image should be a valid URL",
    },
  },
  images: [
    {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: "Image should be a valid URL",
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
