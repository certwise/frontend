import { action } from "../types";
import { Toast } from "../types/toast";

const reducer = (state: Toast[], action: action): Toast[] => {
	switch (action.type) {
		case "MAKE_TOAST":
			return [...state, action.payload];

		case "REMOVE_TOAST":
			state.splice(action.payload, 1);
			return [...state];

		case "REMOVE_ALL_TOAST":
			return [];

		default:
			return state;
	}
};

export default reducer;
