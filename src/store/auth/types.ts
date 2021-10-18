export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const SIGN_UP = "SIGN_UP";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_IMAGE = "UPDATE_USER_IMAGE";

export interface IUser {
	uid: string;
	email: string;
	name: string;
	avatar?: string;
	certificates?: string[];
}

export interface IAuthState {
	uid: string | null;
	user?: any | IUser | null;
	isSignedIN: boolean;
}
