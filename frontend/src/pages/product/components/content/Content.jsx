import { Box, Card, CardContent, Typography } from '@mui/material';
import { CartButton } from '../../../../components';
import { Description } from '../description/Description';
import { transformPrice } from '../../../../utils';

export const Content = ({ product }) => {
	const { title, description, price } = product;

	return (
		<Card>
			<CardContent>
				<Typography variant="h2" my={2}>
					{title}
				</Typography>
				<Description description={description} />
			</CardContent>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mt: 3,
				}}
			>
				<Typography variant="h6" fontWeight="bold">
					Цена: {transformPrice(price)}
				</Typography>
				<CartButton product={product} />
			</Box>
		</Card>
	);
};
