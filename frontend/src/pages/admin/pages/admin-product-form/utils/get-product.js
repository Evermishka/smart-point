export const getProduct = (product) => {
	if (product) {
		return {
			id: product.id,
			title: product.title,
			category: product.category.id,
			imagePreview: product.imagePreview,
			images: product.images.join(', '),
			description: product.description,
			price: product.price,
			quantity: product.quantity,
		};
	} else {
		return {
			title: '',
			category: '',
			imagePreview: '',
			images: [],
			description: '',
			price: '',
			quantity: '',
		};
	}
};
