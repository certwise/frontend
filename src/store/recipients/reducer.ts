import { action } from "..";
import * as types from "./types";

const reducer = (state: types.recipientsState, action: action) => {
	switch (action.type) {
		case "SET_RECIPIENTS":
			return {
				...state,
				recipients: action.payload,
			};
		case "SET_SELECTED_RECIPIENTS":
			return {
				...state,
				selected: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
