import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useRequestServer } from '../../../../../../hooks';
import { API_ROUTE } from '../../../../../../constants';

export const AddCategory = ({ shouldUpdate, setShouldUpdate }) => {
	const [categoryTitle, setCategoryTitle] = useState('');

	const { isLoading, setIsLoading, request } = useRequestServer();

	const handleCategoryNameChange = (event) => {
		setCategoryTitle(event.target.value);
	};

	const handleAddCategory = () => {
		if (!categoryTitle.trim()) return alert('Категория должна иметь название!');

		request(API_ROUTE.CATEGORIES, 'POST', { title: categoryTitle })
			.then(() => {
				setShouldUpdate(!shouldUpdate);
				setCategoryTitle('');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<TextField
				placeholder="Название категории"
				value={categoryTitle}
				onChange={handleCategoryNameChange}
				variant="outlined"
				margin="normal"
				fullWidth
				sx={{ mt: 1 }}
			/>
			<Button
				color="primary"
				variant="contained"
				style={{ marginLeft: '8px', minWidth: 'auto', whiteSpace: 'nowrap' }}
				onClick={handleAddCategory}
				loading={isLoading}
				loadingIndicator={
					<Typography color="primary" size={16}>
						Один момент...
					</Typography>
				}
			>
				Добавить категорию
			</Button>
		</Box>
	);
};
