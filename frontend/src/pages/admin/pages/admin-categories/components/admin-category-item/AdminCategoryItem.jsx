import {
	CircularProgress,
	IconButton,
	ListItem,
	ListItemButton,
	ListItemText,
	TextField,
} from '@mui/material';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Save as SaveIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useRequestServer } from '../../../../../../hooks';
import { API_ROUTE } from '../../../../../../constants';

export const AdminCategoryItem = ({ id, title, shouldUpdate, setShouldUpdate }) => {
	const [currentCategoryTitle, setCurrentCategoryTitle] = useState(title);
	const [isEditing, setIsEditing] = useState(false);

	const { isLoading, setIsLoading, request } = useRequestServer();

	const handleChangeCategoryTitle = (event) => {
		setCurrentCategoryTitle(event.target.value);
	};

	const handleEditCategoryTitle = () => {
		setIsEditing(true);
	};

	const handleSaveCategoryTitle = () => {
		if (!currentCategoryTitle.trim())
			return alert('Категория должна иметь название!');

		request(`${API_ROUTE.CATEGORIES}/${id}`, 'PATCH', { title: currentCategoryTitle })
			.then(() => {
				setShouldUpdate(!shouldUpdate);
			})
			.finally(() => {
				setIsLoading(false);
				setIsEditing(false);
			});
	};

	const handleDeleteCategory = () => {
		request(`${API_ROUTE.CATEGORIES}/${id}`, 'DELETE')
			.then(() => {
				setShouldUpdate(!shouldUpdate);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<ListItem disablePadding sx={{ display: 'block' }}>
			<ListItemButton sx={{ display: 'flex' }}>
				{isEditing ? (
					<>
						<TextField
							placeholder="Название категории"
							value={currentCategoryTitle}
							onChange={handleChangeCategoryTitle}
							variant="outlined"
							margin="normal"
							fullWidth
							sx={{ mt: 1 }}
						/>
						<IconButton
							aria-label="edit"
							onClick={handleSaveCategoryTitle}
							loading={isLoading}
						>
							{isLoading ? <CircularProgress size={24} /> : <SaveIcon />}
						</IconButton>
					</>
				) : (
					<>
						<ListItemText primary={title} />
						<IconButton aria-label="edit" onClick={handleEditCategoryTitle}>
							<EditIcon />
						</IconButton>
					</>
				)}
				<IconButton
					aria-label="delete"
					onClick={handleDeleteCategory}
					loading={isLoading}
				>
					{isLoading ? <CircularProgress size={24} /> : <DeleteIcon />}
				</IconButton>
			</ListItemButton>
		</ListItem>
	);
};
