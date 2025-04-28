export const calculateTotalProductCount = (items) => {
	return items.reduce((total, item) => {
		return (total += item.quantity);
	}, 0);
};
