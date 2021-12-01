export interface user {
	uid: string;
	name: string;
	email: string;
	organization: string;
	isVerified: boolean;
	createdAt: Date;
	photoURL?: string;
	updatedAt: Date;
	numberOfTemplatesCreated: number;
	numberOfCerificatesCreated: number;
	phoneNumber?: string;
}

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const SIGN_UP = "SIGN_UP";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_IMAGE = "UPDATE_USER_IMAGE";
