import { Link } from 'react-router-dom';
import {
	CircularProgress,
	IconButton,
	ListItem,
	ListItemButton,
	ListItemText,
} from '@mui/material';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
} from '@mui/icons-material';
import { useRequestServer } from '../../../../../../hooks';
import { API_ROUTE, ROUTE } from '../../../../../../constants';

export const AdminProductItem = ({ id, title, shouldUpdate, setShouldUpdate }) => {
	const { isLoading, setIsLoading, request } = useRequestServer();

	const handleDeleteProduct = () => {
		request(`${API_ROUTE.PRODUCTS}/${id}`, 'DELETE')
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
				<ListItemText primary={title} />
				<IconButton aria-label="edit" component={Link} to={`${ROUTE.ADMIN_PRODUCTS}/${id}/edit`}>
					<EditIcon />
				</IconButton>
				<IconButton
					aria-label="delete"
					onClick={handleDeleteProduct}
					loading={isLoading}
				>
					{isLoading ? <CircularProgress size={24} /> : <DeleteIcon />}
				</IconButton>
			</ListItemButton>
		</ListItem>
	);
};
