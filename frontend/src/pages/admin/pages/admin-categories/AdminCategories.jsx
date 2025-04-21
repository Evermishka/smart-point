import { useEffect, useState } from 'react';
import { Box, List, Stack } from '@mui/material';
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

	if (isLoading) return <Loader />;

	return (
		<Box>
			<AddCategory shouldUpdate={shouldUpdate} setShouldUpdate={setShouldUpdate} />
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
		</Box>
	);
};
