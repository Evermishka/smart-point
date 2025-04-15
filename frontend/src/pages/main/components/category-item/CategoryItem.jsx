import { ListItem, ListItemButton, ListItemText } from '@mui/material';

export const CategoryItem = ({ id, title, currentCategory, handleCategoryChange }) => (
	<ListItem disablePadding sx={{ display: 'block' }}>
		<ListItemButton
			selected={currentCategory === id}
			onClick={(event) => handleCategoryChange(event, id)}
		>
			<ListItemText primary={title} />
		</ListItemButton>
	</ListItem>
);
