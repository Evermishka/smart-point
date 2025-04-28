import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { CartList, CartTotal } from './components';
import { selectCart } from '../../selectors/select-cart';

export const Cart = () => {
	const { items } = useSelector(selectCart);

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
			{items.length === 0 ? (
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
