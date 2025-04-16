import { List, Stack } from '@mui/material';
import { CategoryItem } from '../category-item/CategoryItem';
import { DEFAULT_CATEGORY } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { resetSearchFilters, setCategory } from '../../../../actions';
import { selectCategory } from '../../../../selectors';

export const CategoriesList = ({ categories }) => {
	const currentCategory = useSelector(selectCategory);

	const dispatch = useDispatch();

	const handleCategoryChange = (event, id) => {
		dispatch(resetSearchFilters);
		dispatch(setCategory(id));
	};
	
	return (
		<Stack sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
			<List sx={{ px: 0 }}>
				<CategoryItem
					id={DEFAULT_CATEGORY.id}
					title={DEFAULT_CATEGORY.title}
					currentCategory={currentCategory}
					handleCategoryChange={handleCategoryChange}
				/>
				{categories.map(({ id, title }) => (
					<CategoryItem
						key={id}
						id={id}
						title={title}
						currentCategory={currentCategory}
						handleCategoryChange={handleCategoryChange}
					/>
				))}
			</List>
		</Stack>
	);
};
