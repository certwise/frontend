import { action } from "..";
import { user, SIGN_IN, SIGN_OUT } from "./types";

export const initialState: user = {
	uid: "",
	name: "",
	isVerified: false,
	createdAt: new Date(),
	numberOfCerificatesRemaining: 0,
	numberOfCerificatesCreated: 0,
	numberOfTemplatesRemaining: 0,
	numberOfTemplatesCreated: 0,
	templates: [],
	currentPlan: "",
	previousSubscriptions: [],
	topUps: [],
	email: "",
	institution: "",
	stripeCustomerId: "",
	subscriptionId: "",
};

const reducer = (state: user, action: action) => {
	switch (action.type) {
		case SIGN_IN:
			return {
				...state,
				isSignedIn: true,
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
