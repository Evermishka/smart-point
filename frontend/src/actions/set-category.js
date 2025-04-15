import { ACTION_TYPE } from './action-type';

export const setCategory = (currentCategory) => ({
	type: ACTION_TYPE.SET_CATEGORY,
	payload: currentCategory,
});
