import { Grid } from '@mui/system';
import { ProductCard } from '../product-card/ProductsCard';

export const ProductsList = ({ products }) => (
	<Grid container spacing={2} sx={{ flexGrow: 1 }}>
		{products.map((product) => (
			<ProductCard product={product} key={product.id} />
		))}
	</Grid>
);
