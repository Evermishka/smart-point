import { useDispatch, useSelector } from 'react-redux';
import { selectSorting } from '../../selectors';
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { setSorting } from '../../actions';

export const Sorting = ({ sortOptions }) => {
	const { order } = useSelector(selectSorting);

	const dispatch = useDispatch();

	const handleSortChange = (event) => {
		const selectedOption = sortOptions.find(
			(option) => option.id === event.target.value,
		);

		if (selectedOption) {
			dispatch(setSorting(selectedOption.params));
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'flex-end',
				mt: 1,
			}}
		>
			<FormControl sx={{ minWidth: 140 }}>
				<Typography sx={{ mb: 1 }}>Сортировать</Typography>
				<Select value={order || ''} onChange={handleSortChange}>
					{sortOptions.map((sortItem) => (
						<MenuItem key={sortItem.id} value={sortItem.id}>
							{sortItem.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};
