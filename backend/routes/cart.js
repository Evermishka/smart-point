const express = require("express");
const { editCart, deleteCart } = require("../controllers/cart");
const authenticated = require("../middlewares/authenticated");
const mapCart = require("../helpers/mapCart");

const router = express.Router({ mergeParams: true });

router.post("/:productId", authenticated, async (req, res) => {
  const updatedCart = await editCart(
    req.user.id,
    req.params.productId,
    req.query.quantity
  );

  res.send({ data: mapCart(updatedCart) });
});

router.delete("/:id", authenticated, async (req, res) => {
  await deleteCart(req.user.id, req.params.id);

  res.send({ error: null });
});

module.exports = router;

// НУЖЕН МАР КОРЗИНЫ
