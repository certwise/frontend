import { User } from "@firebase/auth";

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const SIGN_UP = "SIGN_UP";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_IMAGE = "UPDATE_USER_IMAGE";

export type user = {
	email: string;
	name: string;
	avatar?: string;
	certificates?: string[];
	photoURL?: string | any;
};

export declare interface authState extends User {
	isSignedIn: boolean;
}
