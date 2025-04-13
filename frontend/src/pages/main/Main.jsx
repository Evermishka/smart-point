import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/system';
import { Loader } from '../../components';
import { useRequestServer } from '../../hooks';
import { API_ROUTE } from '../../constants';
import { ProductsList } from './components';

export const Main = () => {
	const [products, setProducts] = useState([]);

	const { isLoading, setIsLoading, request } = useRequestServer();

	useEffect(() => {
		request(API_ROUTE.PRODUCTS, 'GET').then(({ data }) => {
			setProducts(data.products);
			console.log('products', data.products);
		})
		.finally(() => setIsLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Grid container spacing={2} sx={{ display: 'flex', flexGrow: 1 }}>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Grid size={{ xs: 0, md: 3, flexGrow: 1 }}>
						<div>CategoryList</div>
					</Grid>
					<Grid size={{ xs: 12, md: 9 }} sx={{ display: 'flex' }}>
						<ProductsList products={products} />
					</Grid>
				</>
			)}
		</Grid>
	);
};
