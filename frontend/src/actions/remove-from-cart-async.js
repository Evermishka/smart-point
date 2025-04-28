import { API_ROUTE } from '../constants';
import { removeFromCart } from './remove-from-cart';

export const removeFromCartAsync = (deletedCartItem, request) => (dispatch) => {
	return request(`${API_ROUTE.CARTS}`, 'POST', deletedCartItem).then(() => {
		dispatch(removeFromCart(deletedCartItem.productId));
	});
};