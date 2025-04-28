import { Button, Card, CardHeader } from '@mui/material';
import {
	calculateTotalProductCount,
	calculateTotalProductPrice,
	transformPrice,
} from '../../../../utils';

export const CartTotal = ({ items }) => {
	const totalCount = calculateTotalProductCount(items);
	const totalPrice = transformPrice(calculateTotalProductPrice(items));

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
			<Button variant="contained">Оформить заказ</Button>
		</Card>
	);
};
