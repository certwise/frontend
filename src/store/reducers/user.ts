import { action } from "../types/store";
import { SIGN_IN, SIGN_OUT, user } from "../types/user";
import initialState from "../initialState/user";

const reducer = (state: user, action: action): user => {
	switch (action.type) {
		case SIGN_IN:
			return {
				...action.payload,
			};
		case SIGN_OUT:
			return {
				...initialState,
			};
		default:
			return state;
	}
};

export default reducer;
