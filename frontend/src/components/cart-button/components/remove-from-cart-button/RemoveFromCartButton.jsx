import { CircularProgress, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

export const RemoveFromCartButton = ({ handleDeleteProductFromCart, isLoading }) => (
	<IconButton
		aria-label="delete"
		onClick={handleDeleteProductFromCart}
		loading={isLoading}
	>
		{isLoading ? <CircularProgress size={24} /> : <DeleteIcon />}
	</IconButton>
);
