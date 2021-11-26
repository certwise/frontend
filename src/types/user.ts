export type user = {
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
};
