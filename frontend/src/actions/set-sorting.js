import { ACTION_TYPE } from './action-type';

export const setSorting = ({ sortBy, order }) => ({
	type: ACTION_TYPE.SET_SORTING,
	payload: { sortBy, order },
});
