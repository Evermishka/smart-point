export const transformProduct = (product) => ({
    title: product.title,
    categoryId: product.category,
    imagePreview: product.imagePreview,
    images: product.images.split(', '),
    description: product.description,
    price: Number(product.price),
    quantity: Number(product.quantity),
})