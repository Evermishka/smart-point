import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { CartList, CartTotal } from './components';
import { useRequestServer } from '../../hooks';
import { selectCart } from '../../selectors/select-cart';

export const Cart = () => {
	//const { id, userId, items } = useSelector(selectCart);

	const items = [
		{
			product: {
				id: '67f53c80cf40a0b48f4b5ec9',
				title: 'Очки виртуальной реальности HIPER VR MAGIC',
				imagePreview: 'https://img.mvideo.ru/Big/small_pic/200/400369419bb.jpg',
				price: 1999,
			},
			quantity: 5,
		},
		{
			product: {
				id: '67f53bfecf40a0b48f4b5ec5',
				title: 'Очки виртуальной реальности HIPER VRT черные',
				imagePreview: 'https://img.mvideo.ru/Big/small_pic/200/400369420bb.jpg',
				price: 3899,
			},
			quantity: 10,
		},
	];

	const { isLoading, setIsLoading, request } = useRequestServer();
	const dispatch = useDispatch();

	return (
		<Grid
			container
			spacing={2}
			sx={{
				display: 'flex',
				flexGrow: 1,
				justifyContent: 'center',
			}}
		>
			{isLoading ? (
				<Loader />
			) : items.length === 0 ? (
				<Typography variant="subtitle1">В корзине нет товаров</Typography>
			) : (
				<>
					<Grid
						size={{ sm: 8, md: 9 }}
						sx={{
							display: { xs: 'none', sm: 'flex' },
							gap: 1,
						}}
					>
						<CartList items={items} />
					</Grid>
					<Grid
						size={{ xs: 12, sm: 4, md: 3 }}
						sx={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<CartTotal items={items} />
					</Grid>
					<Grid
						size={12}
						sx={{
							display: { xs: 'flex', sm: 'none' },
							justifyContent: 'space-between',
							gap: 1,
						}}
					>
						<CartList items={items} />
					</Grid>
				</>
			)}
		</Grid>
	);
};
