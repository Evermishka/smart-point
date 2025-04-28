import { API_ROUTE } from '../constants';
import { addToCart } from './add-to-cart';

export const addToCartAsync = (newCartItem, request) => (dispatch) => {
	return request(`${API_ROUTE.CARTS}`, 'POST', newCartItem).then((updatedCart) => {
		dispatch(addToCart(updatedCart.data));
	});
};
