import { IUser } from "../auth/types";

export const initialState = {
	certificates: [],
	currentCertificate: {},
};

export interface ICertificatesState {
	certificates: ICertificate[];
	currentCertificate: ICertificate;
}

export interface ICertificate {
	id: number;
	name: string;
	description: string;
	image: string;
	createdAt: string;
	updatedAt?: string;
	fields: ICertificateField[];
	receiver: IUser | string;
}

export interface ICertificateField {
	name: string;
	value: string;
}
