import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, List, Stack, Typography } from '@mui/material';
import { useRequestServer } from '../../../../hooks';
import { getParams } from '../../../../utils';
import {
	selectPage,
	selectSearchPhrase,
	selectShouldSearch,
} from '../../../../selectors';
import { API_ROUTE, ROUTE } from '../../../../constants';
import { resetSearchFilters } from '../../../../actions';
import { AdminProductItem } from './components/admin-product-item/AdminProductItem';
import { Loader, Pagination, Search } from '../../../../components';

export const AdminProducts = () => {
	const [products, setProducts] = useState([]);
	const [lastPage, setLastPage] = useState(1);
	const page = useSelector(selectPage);
	const searchPhrase = useSelector(selectSearchPhrase);
	const shouldSearch = useSelector(selectShouldSearch);
	const [shouldUpdate, setShouldUpdate] = useState(false);

	const { isLoading, setIsLoading, request } = useRequestServer();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const params = getParams({ page, searchPhrase });

		navigate(`${ROUTE.ADMIN_PRODUCTS}?${params.toString()}`);

		request(`${API_ROUTE.PRODUCTS}?${params}`, 'GET')
			.then(({ data: { lastPage, products } }) => {
				setProducts(products);
				setLastPage(lastPage);
			})
			.finally(() => setIsLoading(false));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shouldUpdate, shouldSearch, page]);

	useEffect(() => {
		return () => {
			dispatch(resetSearchFilters);
		};
	}, [dispatch]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
				gap: 1,
			}}
		>
			<Box sx={{ display: 'flex' }}>
				<Search />
				<Button
					variant="contained"
					style={{ marginLeft: '8px', minWidth: 'auto', whiteSpace: 'nowrap' }}
					component={Link}
					to={`${ROUTE.ADMIN_PRODUCTS}/add`}
				>
					Добавить продукт
				</Button>
			</Box>
			{isLoading ? (
				<Loader />
			) : products.length === 0 ? (
				<Box
					sx={{
						display: 'flex',
						flexGrow: 1,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography sx={{ fontSize: 24 }}>Товаров не найдено</Typography>
				</Box>
			) : (
				<>
					<Stack
						sx={{
							display: 'flex',
							flexGrow: 1,
							justifyContent: 'space-between',
						}}
					>
						<List sx={{ px: 0 }}>
							{products.map(({ id, title }) => (
								<AdminProductItem
									key={id}
									id={id}
									title={title}
									shouldUpdate={shouldUpdate}
									setShouldUpdate={setShouldUpdate}
								/>
							))}
						</List>
					</Stack>
					<Pagination lastPage={lastPage} />
				</>
			)}
		</Box>
	);
};
