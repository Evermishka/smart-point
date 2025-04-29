const express = require("express");
const {
  addProduct,
  editProduct,
  deleteProduct,
  getProducts,
  getProduct,
} = require("../controllers/product");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");
const mapProduct = require("../helpers/mapProduct");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { products, lastPage } = await getProducts(
    req.query.search,
    req.query.category,
    req.query.sort_by,
    req.query.order,
    req.query.limit,
    req.query.page
  );

  res.send({ data: { lastPage, products: products.map(mapProduct) } });
});

router.get("/:id", async (req, res) => {
  try {
    const product = await getProduct(req.params.id);

    res.send({ error: null, data: mapProduct(product) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.post("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const newProduct = await addProduct({
    title: req.body.title,
    category: req.body.categoryId,
    image_preview: req.body.imagePreview,
    images: req.body.images,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
  });

  res.send({ data: mapProduct(newProduct) });
});

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const updatedProduct = await editProduct(req.params.id, {
      title: req.body.title,
      category: req.body.categoryId,
      image_preview: req.body.imagePreview,
      images: req.body.images,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    });

    res.send({ data: mapProduct(updatedProduct) });
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteProduct(req.params.id);

    res.send({ error: null });
  }
);

module.exports = router;
