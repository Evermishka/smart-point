module.exports = function (cart) {
  return {
    id: cart._id,
    userId: cart.user,
    items: cart.items.map((item) => ({
      product: {
        id: item.product._id,
        title: item.product.title,
        imagePreview: item.product.image_preview,
        price: item.product.price,
      },
      quantity: item.quantity,
    })),
  };
};
