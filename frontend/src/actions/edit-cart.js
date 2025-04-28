import { ACTION_TYPE } from './action-type';

export const editCart = (newCartData) => ({
	type: ACTION_TYPE.EDIT_CART,
	payload: newCartData,
});
