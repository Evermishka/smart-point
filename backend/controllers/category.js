const Category = require("../models/Category");

// add

async function addCategory(category) {
  const newCategory = await Category.create(category);

  return newCategory;
}

// edit

async function editCategory(id, category) {
  const updatedCategory = await Category.findByIdAndUpdate(id, category, {
    returnDocument: "after",
  });

  return updatedCategory;
}

// delete

function deleteCategory(id) {
  return Category.deleteOne({ _id: id });
}

// get list with sort by title asc

async function getCategories() {
    const categories = await Category.find().sort({ title: 1 });

    return categories;
}

module.exports = {
  addCategory,
  editCategory,
  deleteCategory,
  getCategories
};
