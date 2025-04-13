import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { DrawerMenu, Loader } from '../../components';
import { CategoriesList, ProductsList } from './components';
import { useRequestServer } from '../../hooks';
import { API_ROUTE } from '../../constants';

export const Main = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);

	const { isLoading, setIsLoading, request } = useRequestServer();

	useEffect(() => {
		Promise.all([
			request(API_ROUTE.PRODUCTS, 'GET'),
			request(API_ROUTE.CATEGORIES, 'GET'),
		])
			.then(
				([
					{
						data: { lastPage, products },
					},
					{ data: categories },
				]) => {
					setProducts(products);
					setCategories(categories);
				},
			)
			.finally(() => setIsLoading(false));
	
	}, [request, setIsLoading]);

	return (
		<Grid container spacing={2} sx={{ display: 'flex', flexGrow: 1 }}>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Grid
						size={3}
						sx={{
							display: { xs: 'none', md: 'flex' },
							gap: 1,
						}}
					>
						<CategoriesList categories={categories} />
					</Grid>
					<Grid size={12} sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
						<DrawerMenu openButtonText="Список категорий">
							<CategoriesList categories={categories} />
						</DrawerMenu>
					</Grid>
					<Grid size={{ xs: 12, md: 9 }} sx={{ display: 'flex' }}>
						<ProductsList products={products} />
					</Grid>
				</>
			)}
		</Grid>
	);
};
