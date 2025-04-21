import { ListItem, ListItemButton, ListItemText } from '@mui/material';

export const AdminCategoryItem = ({ title }) => (
	<ListItem disablePadding sx={{ display: 'block' }}>
		<ListItemButton>
			<ListItemText primary={title} />
		</ListItemButton>
	</ListItem>
);
