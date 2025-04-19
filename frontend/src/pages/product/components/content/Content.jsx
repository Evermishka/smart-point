import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { Description } from '../description/Description';
import { transformPrice } from '../../../../utils';

export const Content = ({ title, description, price, quantity }) => (
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
			<Button variant="contained" disabled={quantity <= 0} size="large">
				В корзину
			</Button>
		</Box>
	</Card>
);
