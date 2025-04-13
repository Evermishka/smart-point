import { Box, Grid } from '@mui/material';
import { ProductCard } from '../product-card/ProductsCard';

export const ProductsList = ({ products }) => (
	<Box sx={{ flexGrow: 1 }}>
		<Grid container spacing={2}>
			{products.map((product) => (
				<ProductCard product={product} key={product.id} />
			))}
		</Grid>
	</Box>
);
