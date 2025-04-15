import { debounce, Grid, InputAdornment, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchPhrase } from '../../selectors';
import { setCategory, setPage, setSearchPhrase, setShouldSearch } from '../../actions';
import { DEFAULT_CATEGORY } from '../../constants';

export const Search = () => {
	const searchPhrase = useSelector(selectSearchPhrase);
	const dispatch = useDispatch();

	const startDelayedSearch = useMemo(
		() => debounce(() => dispatch(setShouldSearch), 1000),
		[dispatch],
	);

	const handleSearch = ({ target }) => {
		dispatch(setPage(1));
		dispatch(setCategory(DEFAULT_CATEGORY.id));
		dispatch(setSearchPhrase(target.value));
		startDelayedSearch();
	};

	return (
		<Grid size={12} sx={{ mb: 3, px: 1 }}>
			<TextField
				id="search-input"
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					},
				}}
				variant="standard"
				fullWidth
				value={searchPhrase}
				placeholder="Поиск по названию..."
				onChange={handleSearch}
			/>
		</Grid>
	);
};
