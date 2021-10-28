import { action } from "..";
import { authState, SIGN_IN, SIGN_OUT } from "./types";

export const initialState: authState = {
	uid: "",
	isSignedIn: false,
	emailVerified: false,
	isAnonymous: false,
	metadata: undefined as any,
	providerData: [],
	refreshToken: "",
	tenantId: null,
	delete: function (): Promise<void> {
		throw new Error("Function not implemented.");
	},
	getIdToken: function (forceRefresh?: boolean): Promise<string> {
		throw new Error("Function not implemented.");
	},
	getIdTokenResult: function (forceRefresh?: boolean): any {
		throw new Error("Function not implemented.");
	},
	reload: function (): Promise<void> {
		throw new Error("Function not implemented.");
	},
	toJSON: function (): object {
		throw new Error("Function not implemented.");
	},
	displayName: null,
	email: null,
	phoneNumber: null,
	photoURL: null,
	providerId: "",
};

const reducer = (state: authState, action: action) => {
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
