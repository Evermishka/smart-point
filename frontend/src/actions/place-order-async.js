import { API_ROUTE } from '../constants';
import { placeOrder } from './place-order';

export const placeOrderAsync = (cardId, request) => (dispatch) => {
	return request(`${API_ROUTE.CARTS}`, 'DELETE', { cardId }).then(() => {
		dispatch(placeOrder);
	});
};
