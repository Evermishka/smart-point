import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import { DrawerMenu, Loader, Pagination, Search, Sorting } from '../../components';
import { CategoriesList, ProductsList } from './components';
import { useRequestServer } from '../../hooks';
import { getParams } from '../../utils';
import {
	selectCategory,
	selectPage,
	selectSearchPhrase,
	selectShouldSearch,
	selectSorting,
} from '../../selectors';
import { API_ROUTE, SORT_BY_PRICE } from '../../constants';
import { resetSearchFilters } from '../../actions';

export const Main = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [lastPage, setLastPage] = useState(1);
	const page = useSelector(selectPage);
	const currentCategory = useSelector(selectCategory);
	const searchPhrase = useSelector(selectSearchPhrase);
	const shouldSearch = useSelector(selectShouldSearch);
	const { sortBy, order } = useSelector(selectSorting);

	const { isLoading, setIsLoading, request } = useRequestServer();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const params = getParams({ page, searchPhrase, currentCategory, sortBy, order });

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
	}, [shouldSearch, currentCategory, page, order]);

	useEffect(() => {
		return () => {
			dispatch(resetSearchFilters);
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
							sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between', gap: 1 }}
						>
							<DrawerMenu openButtonText="Список категорий">
								<CategoriesList categories={categories} />
							</DrawerMenu>
							<Sorting sortOptions={SORT_BY_PRICE} />
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
									<Box
										sx={{
											display: {
												xs: 'none',
												md: 'block',
											},
										}}
									>
										<Sorting sortOptions={SORT_BY_PRICE} />
									</Box>
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
