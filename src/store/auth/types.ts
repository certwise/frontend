export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const SIGN_UP = "SIGN_UP";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_IMAGE = "UPDATE_USER_IMAGE";

export type user = {
	uid: string;
	name: string;
	email: string;
	institution: string;
	isVerified: boolean;
	createdAt: Date;
	photoURL?: string;
	updatedAt?: Date;

	numberOfCerificatesRemaining: number;
	numberOfCerificatesCreated: number;
	certificates?: string[];

	numberOfTemplatesRemaining: number;
	numberOfTemplatesCreated: number;
	templates: string[];

	currentPlan: string;
	previousSubscriptions: string[];
	topUps: string[];

	stripeCustomerId: string;

	subscriptionId: string;
};
