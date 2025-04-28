import { useDispatch, useSelector } from 'react-redux';
import {
	addToCart,
	addToCartAsync,
	removeFromCart,
	removeFromCartAsync,
} from '../actions';
import { selectCart } from '../selectors';
import { editCartAsync, editCart } from '../actions';

export const useCart = (product, setIsLoading, request) => {
	const cart = useSelector(selectCart);

	const dispatch = useDispatch();

	const isInCart =
		cart?.items?.length !== 0
			? cart.items.some((item) => item.product.id === product.id)
			: false;

	const productQuantityInCart = isInCart
		? cart.items.find((item) => item.product.id === product.id).quantity
		: 0;

	const productTotalQuantity = product.quantity;

	const IsAuthenticatedUser = cart.id;

	const handleAddToCart = () => {
		if (IsAuthenticatedUser) {
			const newCartItem = {
				productId: product.id,
				quantity: 1,
			};

			dispatch(addToCartAsync(newCartItem, request)).finally(() => {
				setIsLoading(false);
			});
		} else {
			const newCartItem = {
				id: null,
				item: {
					product: {
						id: product.id,
						title: product.title,
						imagePreview: product.imagePreview,
						price: product.price,
						quantity: product.quantity
					},
					quantity: 1,
				},
			};

			dispatch(addToCart(newCartItem));
		}
	};

	const handleIncreaseItemQuantityInCart = () => {
		if (IsAuthenticatedUser) {
			const newCartItem = {
				productId: product.id,
				quantity: productQuantityInCart + 1,
			};

			dispatch(editCartAsync(newCartItem, request)).finally(() => {
				setIsLoading(false);
			});
		} else {
			const newCartItem = {
				productId: product.id,
				quantity: productQuantityInCart + 1,
			};

			dispatch(editCart(newCartItem));
		}
	};

	const handleDecreaseItemQuantityInCart = () => {
		if (IsAuthenticatedUser) {
			const newCartItem = {
				productId: product.id,
				quantity: productQuantityInCart - 1,
			};

			dispatch(editCartAsync(newCartItem, request)).finally(() => {
				setIsLoading(false);
			});
		} else {
			const newCartItem = {
				productId: product.id,
				quantity: productQuantityInCart - 1,
			};

			dispatch(editCart(newCartItem));
		}
	};

	const handleDeleteProductFromCart = () => {
		if (IsAuthenticatedUser) {
			const deletedCartItem = {
				productId: product.id,
				quantity: 0,
			};
			dispatch(removeFromCartAsync(deletedCartItem, request)).finally(() => {
				setIsLoading(false);
			});
		} else {
			dispatch(removeFromCart(product.id));
		}
	};

	return {
		handleAddToCart,
		handleIncreaseItemQuantityInCart,
		handleDecreaseItemQuantityInCart,
		handleDeleteProductFromCart,
		isInCart,
		productQuantityInCart,
		productTotalQuantity
	};
};
