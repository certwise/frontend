import { action } from "../types/store";
import { SIGN_IN, SIGN_OUT, user } from "../types/user";

export const signIn = (user: user): action => {
	return {
		type: SIGN_IN,
		payload: user,
	};
};
export const signOut = (): action => {
	return {
		type: SIGN_OUT,
		payload: null,
	};
};
