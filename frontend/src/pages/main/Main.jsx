import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import { DrawerMenu, Loader, Pagination, Search } from '../../components';
import { CategoriesList, ProductsList } from './components';
import { useRequestServer } from '../../hooks';
import { getParams } from '../../utils';
import {
	selectCategory,
	selectPage,
	selectSearchPhrase,
	selectShouldSearch,
} from '../../selectors';
import { API_ROUTE, DEFAULT_CATEGORY } from '../../constants';
import { setCategory, setPage, setSearchPhrase } from '../../actions';

export const Main = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [lastPage, setLastPage] = useState(1);
	const page = useSelector(selectPage);
	const currentCategory = useSelector(selectCategory);
	const searchPhrase = useSelector(selectSearchPhrase);
	const shouldSearch = useSelector(selectShouldSearch);

	const { isLoading, setIsLoading, request } = useRequestServer();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const params = getParams({ page, searchPhrase, currentCategory });

		navigate(`/?${params.toString()}`);

		Promise.all([
			request(`${API_ROUTE.PRODUCTS}?${params}`, 'GET'),
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shouldSearch, currentCategory, page]);

	useEffect(() => {
		return () => {
			dispatch(setPage(1));
			dispatch(setSearchPhrase(''));
			dispatch(setCategory(DEFAULT_CATEGORY.id));
		};
	}, [dispatch]);

	return (
		<Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
			<Search />
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
						<Grid
							size={12}
							sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}
						>
							<DrawerMenu openButtonText="Список категорий">
								<CategoriesList categories={categories} />
							</DrawerMenu>
						</Grid>
						<Grid
							size={{ xs: 12, md: 9 }}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 5,
								flexGrow: 1,
							}}
						>
							{products.length !== 0 ? (
								<>
									<ProductsList products={products} />
									<Pagination lastPage={lastPage} />
								</>
							) : (
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Typography sx={{ fontSize: 24 }}>
										Товаров не найдено
									</Typography>
								</Box>
							)}
						</Grid>
					</>
				)}
			</Grid>
		</Box>
	);
};
