const Product = require("../models/Product");

// add

async function addProduct(product) {
  const newProduct = await Product.create(product);

  await newProduct.populate("category");

  return newProduct;
}

// edit

async function editProduct(id, product) {
  const updatedProduct = await Product.findByIdAndUpdate(id, product, {
    returnDocument: "after",
  });

  await updatedProduct.populate("category");

  return updatedProduct;
}

// delete

function deleteProduct(id) {
  return Product.deleteOne({ _id: id });
}

// get list with filters, sort, search and pagination

async function getProducts(
  search = "",
  category,
  sort_by,
  order = "asc",
  limit = 10,
  page = 1
) {
  const findOptions = category
    ? {
        title: { $regex: search, $options: "i" },
        category: category,
      }
    : {
        title: { $regex: search, $options: "i" },
      };

  const sortOptions = sort_by
    ? { [sort_by]: order === "asc" ? 1 : -1 }
    : { title: 1 };

  const [products, count] = await Promise.all([
    Product.find(findOptions)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sortOptions),
    Product.countDocuments(findOptions),
  ]);

  return { products, lastPage: Math.ceil(count / limit) };
}

// get item

async function getProduct(id) {
  return Product.findById(id).populate("category");
}

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  getProducts,
  getProduct,
};
