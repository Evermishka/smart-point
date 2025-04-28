import { API_ROUTE } from '../constants';
import { editCart } from './edit-cart';

export const editCartAsync = (newCartItem, request) => (dispatch) => {
    return request(`${API_ROUTE.CARTS}`, 'POST', newCartItem).then((updatedCart) => {
        dispatch(editCart(updatedCart.data));
    });
};
