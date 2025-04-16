import { Box, Grid } from '@mui/material';
import { Sorting } from '../../../../components';
import { ProductCard } from '../product-card/ProductsCard';
import { SORT_BY_PRICE } from '../../../../constants';

export const ProductsList = ({ products }) => (
	<Box sx={{ flexGrow: 1 }}>		
		<Grid container spacing={2}>
			{products.map((product) => (
				<ProductCard product={product} key={product.id} />
			))}
		</Grid>
	</Box>
);
