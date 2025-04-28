const Cart = require("../models/Cart");
const User = require("../models/User");

// edit - add/delete products and change quantity

async function editCart(userId, productId, quantity) {
  let updatedCart = await Cart.findOne({ user: userId });

  if (!updatedCart) {
    updatedCart = await Cart.create({ user: userId, items: [] });
    await User.findByIdAndUpdate(userId, { $set: { cart: updatedCart } });
  }

  const itemIndex = updatedCart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    updatedCart = await Cart.findByIdAndUpdate(
      updatedCart.id,
      {
        $push: { items: { product: productId, quantity } },
      },
      {
        returnDocument: "after",
      }
    );
  } else {
    if (quantity === 0) {
      await updatedCart.items.splice(itemIndex, 1);
    } else {
      updatedCart.items[itemIndex].quantity += quantity;
    }
    await updatedCart.save();
  }

  await updatedCart.populate({
    path: "items",
    populate: "product",
  });

  return updatedCart;
}

// delete

async function deleteCart(userId, cartId) {
  await Cart.deleteOne({ _id: cartId });
  await User.findByIdAndUpdate(userId, { $set: { cart: null } });
}

module.exports = {
  editCart,
  deleteCart,
};
