const express = require("express");
const {
  addCategory,
  editCategory,
  deleteCategory,
  getCategories,
} = require("../controllers/category");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const categories = await getCategories();

  res.send({ data: categories });
});

router.post("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const newCategory = await addCategory({
    title: req.body.title
  });

  res.send({ data: newCategory });
});

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const updatedCategory = await editCategory(req.params.id, {
      title: req.body.title
    });

    res.send({ data: updatedCategory });
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteCategory(req.params.id);

    res.send({ error: null });
  }
);

module.exports = router;
