import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Pagination, Stack } from '@mui/material';
import { DrawerMenu, Loader } from '../../components';
import { CategoriesList, ProductsList } from './components';
import { useRequestServer } from '../../hooks';
import { API_ROUTE } from '../../constants';

export const Main = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const { isLoading, setIsLoading, request } = useRequestServer();

	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams({
			page: page,
		});

		navigate(`/?${params.toString()}`);

		Promise.all([
			request(`${API_ROUTE.PRODUCTS}?page=${page}`, 'GET'),
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
					setLastPage(lastPage);
				},
			)
			.finally(() => setIsLoading(false));
	}, [request, setIsLoading, navigate, page]);

	const handlePaginationChange = (event, value) => {
		setPage(value);
	};

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
					<Grid
						size={{ xs: 12, md: 9 }}
						sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}
					>
						<ProductsList products={products} />
						<Stack spacing={2} sx={{ alignSelf: 'center' }}>
							<Pagination
								count={lastPage}
								page={page}
								onChange={handlePaginationChange}
							/>
						</Stack>
					</Grid>
				</>
			)}
		</Grid>
	);
};
