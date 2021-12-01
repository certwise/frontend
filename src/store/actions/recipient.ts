import {
	action,
	recipient,
	SET_ALL_RECIPIENTS,
	SET_SELECTED_RECIPIENTS,
	SET_SELECTED_RECIPIENTS_IN_CERTIFICATE,
	SET_SELECTED_RECIPIENTS_IN_GROUP,
} from "../types";

export const setAll = (recipients: recipient[]): action => {
	return {
		type: SET_ALL_RECIPIENTS,
		payload: recipients,
	};
};

export const setSelectedInCertificate = (recipients: recipient[]): action => {
	return {
		type: SET_SELECTED_RECIPIENTS_IN_CERTIFICATE,
		payload: recipients,
	};
};

export const setSelectedInGroup = (recipients: recipient[]): action => {
	return {
		type: SET_SELECTED_RECIPIENTS_IN_GROUP,
		payload: recipients,
	};
};

export const setSelectedRecipients = (recipients: recipient[]): action => {
	return {
		type: SET_SELECTED_RECIPIENTS,
		payload: recipients,
	};
};
