import { Button, Typography } from '@mui/material';
import { useCart, useRequestServer } from '../../hooks';
import { ChangeItemQuantityInCart, RemoveFromCartButton } from './components';

export const CartButton = ({ product }) => {
	const { isLoading, setIsLoading, request } = useRequestServer();

	const {
		handleAddToCart,
		handleIncreaseItemQuantityInCart,
		handleDecreaseItemQuantityInCart,
		handleDeleteProductFromCart,
		isInCart,
		productQuantityInCart,
		productTotalQuantity
	} = useCart(product, setIsLoading, request);

	return (
		<>
			{isInCart ? (
				<>
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
				</>
			) : (
				<Button
					variant="contained"
					disabled={product.quantity <= 0}
					onClick={handleAddToCart}
					loading={isLoading}
					loadingIndicator={
						<Typography color="primary" size={16}>
							Один момент...
						</Typography>
					}
				>
					{product.quantity <= 0 ? 'Нет в наличии' : 'В корзину'}
				</Button>
			)}
		</>
	);
};
