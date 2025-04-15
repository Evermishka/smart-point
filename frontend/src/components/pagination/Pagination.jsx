import { useDispatch, useSelector } from 'react-redux';
import { Pagination as MuiPagination, Stack } from '@mui/material';
import { setPage } from '../../actions';
import { selectPage } from '../../selectors';

export const Pagination = ({lastPage}) => {
	const page = useSelector(selectPage);

	const dispatch = useDispatch();

	const handlePaginationChange = (event, value) => {
		dispatch(setPage(value));
	};
    
	return (
		<Stack spacing={2} sx={{ alignSelf: 'center' }}>
			<MuiPagination
				count={lastPage}
				page={page}
				onChange={handlePaginationChange}
			/>
		</Stack>
	);
};
