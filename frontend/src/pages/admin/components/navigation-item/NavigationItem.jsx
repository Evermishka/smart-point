import { Link } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';

export const NavigationItem = ({
	id,
	title,
	currentItem,
	handleCurrentItemChange,
	route,
}) => (
	<ListItem disablePadding sx={{ display: 'block' }}>
		<ListItemButton
			selected={currentItem === id}
			onClick={(event) => handleCurrentItemChange(event, id)}
			component={Link}
			to={route}
		>
			<ListItemText primary={title} />
		</ListItemButton>
	</ListItem>
);
