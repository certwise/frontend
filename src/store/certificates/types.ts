export const CREATE_CERTIFICATE = "CREATE_CERTIFICATE";
export const SET_CERTIFICATES = "SET_CERTIFICATES";
export const SET_CURRENT_CERTIFICATE = "SET_CURRENT_CERTIFICATE";
export const UPDATE_CERTIFICATE = "UPDATE_CERTIFICATE";
export const DELETE_CERTIFICATE = "DELETE_CERTIFICATE";

export type certificate = {
	id?: string;
	issuerId: string;
	templateId: string;
	issueDate: Date | false;
	createdAt: Date;
	lastUpdated: Date;
	validTill: Date | true | undefined;
	recipient: recipient;
	fields: Array<Field>;
	storageRef?: string;
};

export type Field = {
	name: string;
	value: string;
};

export type recipient = {
	id?: string;
	name: string;
	email: string;
	phone?: string;
	certificates?: Array<string>;
};
