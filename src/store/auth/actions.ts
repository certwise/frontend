import { action } from "..";
import { SIGN_IN, SIGN_OUT } from "./types";

export const signIn = (user: any): action => {
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
