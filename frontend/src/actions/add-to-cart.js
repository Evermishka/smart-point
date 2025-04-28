import { ACTION_TYPE } from './action-type';

export const addToCart = (newCartData) => ({
	type: ACTION_TYPE.ADD_TO_CART,
	payload: newCartData,
});