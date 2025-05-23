const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
