import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { Box, Card, CardHeader, CardMedia, Grid } from '@mui/material';
import {
	ChangeItemQuantityInCart,
	RemoveFromCartButton,
} from '../../../../components/cart-button/components';
import { useCart, useRequestServer } from '../../../../hooks';
import { transformPrice } from '../../../../utils';

const StyledLink = styled(Link)({
	textDecoration: 'none',
	display: 'flex',
	flexGrow: 1,
});

export const CartItem = ({ product }) => {
	const { id, title, imagePreview, price } = product;

	const { isLoading, setIsLoading, request } = useRequestServer();

	const {
		handleIncreaseItemQuantityInCart,
		handleDecreaseItemQuantityInCart,
		handleDeleteProductFromCart,
		isInCart,
		productQuantityInCart,
		productTotalQuantity
	} = useCart(product, setIsLoading, request);

	if (!isInCart) return null;

	return (
		<Card
			variant="outlined"
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: { xs: 'center' },
				flexGrow: 1,
				flexDirection: { xs: 'column', sm: 'row' },
			}}
		>
			<Grid size={{ xs: 6, sm: 3 }} sx={{ display: 'flex' }}>
				<StyledLink to={`/${id}`}>
					<CardMedia
						component="img"
						image={imagePreview}
						alt={title}
						style={{
							objectFit: 'cover',
							width: '100%',
							height: 'auto',
						}}
					/>
				</StyledLink>
			</Grid>
			<Grid
				size={{ xs: 12, md: 9 }}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-around',
					alignItems: 'flex-start',
					gap: 4,
					height: '100%',
				}}
			>
				<StyledLink to={`/${id}`}>
					<CardHeader title={title} sx={{ color: 'text.secondary' }} />
				</StyledLink>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						gap: 2,
						width: '100%',
					}}
				>
					<CardHeader title={transformPrice(price)} />
					<ChangeItemQuantityInCart
						handleDecreaseItemQuantityInCart={
							handleDecreaseItemQuantityInCart
						}
						handleIncreaseItemQuantityInCart={
							handleIncreaseItemQuantityInCart
						}
						isLoading={isLoading}
						productQuantityInCart={productQuantityInCart}
						productTotalQuantity={productTotalQuantity}
					/>
					<RemoveFromCartButton
						handleDeleteProductFromCart={handleDeleteProductFromCart}
						isLoading={isLoading}
					/>
				</Box>
			</Grid>
		</Card>
	);
};
