import { DEFAULT_CATEGORY } from '../constants';

export const getParams = ({ page = 1, searchPhrase = '', currentCategory = '' }) => {
	const params = new URLSearchParams({
		page: page,
	});

	if (searchPhrase) params.append('search', searchPhrase);

	if (currentCategory !== DEFAULT_CATEGORY.id)
		params.append('category', currentCategory);

	return params;
};
