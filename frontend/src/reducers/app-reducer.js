import { ACTION_TYPE } from '../actions';

const initialAppState = {
	searchPhrase: '',
	shouldSearch: false,
	page: 1,
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_SEARCH_PHRASE:
			return {
				...state,
				searchPhrase: action.payload,
			};
		case ACTION_TYPE.SET_SHOULD_SEARCH:
			return {
				...state,
				shouldSearch: !state.shouldSearch,
			};
		case ACTION_TYPE.SET_PAGE:
			return {
				...state,
				page: action.payload,
			};
		default:
			return state;
	}
};
