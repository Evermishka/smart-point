module.exports = function (product) {
  return {
    id: product.id,
    title: product.title,
    category: {
      id: product.category.id,
      title: product.category.title
    },
    imagePreview: product.image_preview,
    images: product.images,
    description: product.description,
    price: product.price,
    quantity: product.quantity
  };
};