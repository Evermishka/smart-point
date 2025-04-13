import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';
import { DrawerMenu, Loader, Search } from '../../components';
import { CategoriesList, ProductsList } from './components';
import { useRequestServer } from '../../hooks';
import { selectPage, selectSearchPhrase, selectShouldSearch } from '../../selectors';
import { API_ROUTE, DEFAULT_CATEGORY } from '../../constants';
import { setPage } from '../../actions';

export const Main = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const page = useSelector(selectPage);
	const [lastPage, setLastPage] = useState(1);
	const [currentCategory, setCurrentCategory] = useState(DEFAULT_CATEGORY.id);
	const searchPhrase = useSelector(selectSearchPhrase);
	const shouldSearch = useSelector(selectShouldSearch);
	const { isLoading, setIsLoading, request } = useRequestServer();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const params = new URLSearchParams({
			page: page,
		});

		if (searchPhrase) params.append('search', searchPhrase)

		if (currentCategory !== DEFAULT_CATEGORY.id) params.append('category', currentCategory)

		navigate(`/?${params.toString()}`);

		Promise.all([
			request(
				`${API_ROUTE.PRODUCTS}?${params}`,
				'GET',
			),
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
	}, [shouldSearch, page]);

	const handleCategoryChange = (event) => {
		console.log('event', event.target)
	}

	const handlePaginationChange = (event, value) => {
		dispatch(setPage(value));
	};

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
							<CategoriesList categories={categories} currentCategory={currentCategory} handleCategoryChange={handleCategoryChange} />
						</Grid>
						<Grid
							size={12}
							sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}
						>
							<DrawerMenu openButtonText="Список категорий">
								<CategoriesList categories={categories} currentCategory={currentCategory} handleCategoryChange={handleCategoryChange} />
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
									<Stack spacing={2} sx={{ alignSelf: 'center' }}>
										<Pagination
											count={lastPage}
											page={page}
											onChange={handlePaginationChange}
										/>
									</Stack>
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
										Товаров нет в наличии
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
