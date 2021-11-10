import { action } from "..";
import { user, SIGN_IN, SIGN_OUT } from "./types";

export const initialState: user = {
	uid: "",
	name: "",
	isVerified: false,
	createdAt: new Date(),

	email: "",
	institution: "",
};

const reducer = (state: user, action: action) => {
	switch (action.type) {
		case SIGN_IN:
			return {
				...state,
				...action.payload,
			};
		case SIGN_OUT:
			return {
				initialState,
			};
		default:
			return state;
	}
};

export default reducer;
