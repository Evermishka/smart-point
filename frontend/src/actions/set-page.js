import { ACTION_TYPE } from './action-type';

export const setPage = (pageNumber) => ({
    type: ACTION_TYPE.SET_PAGE,
    payload: pageNumber,
});
