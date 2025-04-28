import { Box, Grid } from '@mui/material';
import { CartItem } from '../cart-item/CartItem';

export const CartList = ({ items }) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2}>
				{items.map(({ product }) => (
					<CartItem key={product.id} product={product} />
				))}
			</Grid>
		</Box>
	);
};
