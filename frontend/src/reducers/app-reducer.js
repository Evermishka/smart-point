import { ACTION_TYPE } from '../actions';
import { DEFAULT_CATEGORY } from '../constants';

const initialAppState = {
	category: DEFAULT_CATEGORY.id,
	page: 1,
	searchPhrase: '',
	shouldSearch: false,
	sorting: {
		sortBy: '',
		order: '',
	},
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.RESET_SEARCH_FILTERS:
			return {
				...state,
				category: DEFAULT_CATEGORY.id,
				page: 1,
				searchPhrase: '',
			};
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
		case ACTION_TYPE.SET_SORTING:
			return {
				...state,
				sorting: {
					...state.sorting,
					sortBy: action.payload.sortBy,
					order: action.payload.order,
				},
			};
		default:
			return state;
	}
};
