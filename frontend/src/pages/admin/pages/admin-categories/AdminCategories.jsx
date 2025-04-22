import { useEffect, useState } from 'react';
import { Box, List, Stack, Typography } from '@mui/material';
import { Loader } from '../../../../components';
import { useRequestServer } from '../../../../hooks';
import { API_ROUTE } from '../../../../constants';
import { AddCategory, AdminCategoryItem } from './components';

export const AdminCategories = () => {
	const [categories, setCategories] = useState([]);
	const [shouldUpdate, setShouldUpdate] = useState(false);

	const { isLoading, setIsLoading, request } = useRequestServer();

	useEffect(() => {
		request(`${API_ROUTE.CATEGORIES}`, 'GET')
			.then((categories) => {
				setCategories(categories.data);
			})
			.finally(() => setIsLoading(false));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shouldUpdate]);

	return (
		<Box>
			<AddCategory shouldUpdate={shouldUpdate} setShouldUpdate={setShouldUpdate} />
			{isLoading ? (
				<Loader />
			) : categories.length === 0 ? (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography sx={{ fontSize: 24 }}>Категорий не найдено</Typography>
				</Box>
			) : (
				<Stack sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
					<List sx={{ px: 0 }}>
						{categories.map(({ id, title }) => (
							<AdminCategoryItem
								key={id}
								id={id}
								title={title}
								shouldUpdate={shouldUpdate}
								setShouldUpdate={setShouldUpdate}
							/>
						))}
					</List>
				</Stack>
			)}
		</Box>
	);
};
