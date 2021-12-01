import { CustomField } from ".";

export interface recipient {
	_id?: string;
	email: string;
	name: string;
	createdAt: Date;
	customFields: CustomField[];
	organization: string;
	groups: string[];
	certificates: string[];
}

export interface recipientState {
	all: recipient[];
	groups: Array<{
		[key: string]: recipient[];
	}>;
	selected: {
		recipients: recipient[];
		group: recipient[];
		certificate: recipient[];
	};
}

export const SET_ALL_RECIPIENTS = "SET_ALL_RECIPIENTS";
export const SET_CERTIFICATES_RECIPIENTS = "SET_CERTIFICATES_RECIPIENTS";
export const SET_SELECTED_RECIPIENTS = "SET_SELECTED_RECIPIENTS";
export const SET_SELECTED_RECIPIENTS_IN_GROUP =
	"SET_SELECTED_RECIPIENTS_IN_GROUP";
export const SET_SELECTED_RECIPIENTS_IN_CERTIFICATE =
	"SET_SELECTED_RECIPIENTS_IN_CERTIFICATE";
