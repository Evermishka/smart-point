import { useDispatch } from 'react-redux';
import { Button, Card, CardHeader, Typography } from '@mui/material';
import {
	calculateTotalProductCount,
	calculateTotalProductPrice,
	transformPrice,
} from '../../../../utils';
import { placeOrder, placeOrderAsync } from '../../../../actions';
import { useRequestServer } from '../../../../hooks';

export const CartTotal = ({ items, cartId, handleOpenModal }) => {
	const totalCount = calculateTotalProductCount(items);
	const totalPrice = transformPrice(calculateTotalProductPrice(items));
	const IsAuthenticatedUser = cartId;

	const dispatch = useDispatch();
	const { isLoading, setIsLoading, request } = useRequestServer();

	const handlePlaceOrder = () => {
		if (IsAuthenticatedUser) {
			dispatch(placeOrderAsync(cartId, request)).finally(() => {
				setIsLoading(false);
			});
		} else {
			dispatch(placeOrder);
		}
		handleOpenModal();
	};

	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 4,
			}}
		>
			<CardHeader
				title={`Всего товаров: ${totalCount}`}
				sx={{ textAlign: 'center' }}
			/>
			<CardHeader
				title={`Сумма заказа: ${totalPrice}`}
				sx={{ textAlign: 'center' }}
			/>
			<Button
				variant="contained"
				onClick={handlePlaceOrder}
				loading={isLoading}
				loadingIndicator={
					<Typography color="primary" size={16}>
						Один момент...
					</Typography>
				}
			>
				Оформить заказ
			</Button>
		</Card>
	);
};
