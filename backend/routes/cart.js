const express = require("express");
const { editCart, deleteCart } = require("../controllers/cart");
const authenticated = require("../middlewares/authenticated");
const mapCart = require("../helpers/mapCart");

const router = express.Router({ mergeParams: true });

router.post("/", authenticated, async (req, res) => {
  const updatedCart = await editCart(
    req.user.id,
    req.body.productId,
    req.body.quantity
  );

  res.send({ data: mapCart(updatedCart) });
});

router.delete("/", authenticated, async (req, res) => {
  await deleteCart(req.user.id, req.body.cardId);

  res.send({ error: null });
});

module.exports = router;
