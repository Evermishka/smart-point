import { ACTION_TYPE } from '../actions';
import { DEFAULT_CATEGORY } from '../constants';

const initialAppState = {
	category: DEFAULT_CATEGORY.id,
	page: 1,
	searchPhrase: '',
	shouldSearch: false,
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CATEGORY:
			return {
				...state,
				category: action.payload,
			};
		case ACTION_TYPE.SET_PAGE:
			return {
				...state,
				page: action.payload,
			};
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
		default:
			return state;
	}
};
