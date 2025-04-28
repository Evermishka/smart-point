import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import {
	AddCircleOutline as AddIcon,
	RemoveCircleOutline as RemoveIcon,
} from '@mui/icons-material';

export const ChangeItemQuantityInCart = ({
	handleDecreaseItemQuantityInCart,
	handleIncreaseItemQuantityInCart,
	isLoading,
	productQuantityInCart,
	productTotalQuantity
}) => (
	<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
		<IconButton
			aria-label="delete"
			onClick={handleDecreaseItemQuantityInCart}
			loading={isLoading}
			disabled={productQuantityInCart <= 1}
		>
			{isLoading ? <CircularProgress size={24} /> : <RemoveIcon />}
		</IconButton>
		<Typography>{productQuantityInCart}</Typography>
		<IconButton
			aria-label="delete"
			onClick={handleIncreaseItemQuantityInCart}
			loading={isLoading}
			disabled={productQuantityInCart >= productTotalQuantity}
		>
			{isLoading ? <CircularProgress size={24} /> : <AddIcon />}
		</IconButton>
	</Box>
);
