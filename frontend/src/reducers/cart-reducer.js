import { ACTION_TYPE } from '../actions';

const initialCartState = {
	id: null,
	items: [],
};

export const cartReducer = (state = initialCartState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CART:
			return {
				...state,
				id: action.payload.id,
				items: [...action.payload.items],
			};
		case ACTION_TYPE.ADD_TO_CART:
			return {
				...state,
				id: action.payload.id,
				items: action.payload.id
					? [...action.payload.items]
					: [...state.items, action.payload.item],
			};
		case ACTION_TYPE.EDIT_CART:
			return {
				...state,
				items: state.id
					? [...action.payload.items]
					: state.items.map((item) =>
							item.product.id === action.payload.productId
								? { ...item, quantity: action.payload.quantity }
								: item,
						),
			};
		case ACTION_TYPE.REMOVE_FROM_CART:
			return {
				...state,
				items: state.items.filter((item) => item.product.id !== action.payload),
			};
		case ACTION_TYPE.LOGOUT:
			return initialCartState;
		case ACTION_TYPE.PLACE_ORDER:
			return initialCartState;
		default:
			return state;
	}
};
