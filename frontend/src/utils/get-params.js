import { DEFAULT_CATEGORY } from '../constants';

export const getParams = ({
	page = 1,
	searchPhrase = '',
	currentCategory = '',
	sortBy = '',
	order = '',
}) => {
	const params = new URLSearchParams({
		page: page,
	});

	if (searchPhrase) params.append('search', searchPhrase);

	if (currentCategory && currentCategory !== DEFAULT_CATEGORY.id)
		params.append('category', currentCategory);

	if (sortBy && order) {
		params.append('sort_by', sortBy);
		params.append('order', order);
	}

	return params;
};
