module.exports = function (cart) {
  return {
    id: cart._id,
    userId: cart.user,
    items: cart.items.map((item) => ({
      id: item.product._id,
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
    })),
  };
};
