import { action, CustomField, group, template } from "../types";

export const setSelectedTemplate = (template: template): action => {
	return {
		type: "CREATE_SET_SELECTED_TEMPLATE",
		payload: template,
	};
};

export const setCreateType = (createType: "single" | "group"): action => {
	return {
		type: "CREATE_SET_TYPE",
		payload: createType,
	};
};

export const setCreateGroup = (group: group): action => {
	return {
		type: "CREATE_SET_SELECTED_GROUP",
		payload: group,
	};
};

export const setCreateRecipient = (recipient: string): action => {
	return {
		type: "CREATE_SET_SELECTED_RECIPIENT",
		payload: recipient,
	};
};

export const setCreatePage = (page: 1 | 2 | 3): action => {
	return {
		type: "CREATE_SET_PAGE_NUMBER",
		payload: page,
	};
};

export const setCreateSingleRecipientCertificateFields = (
	fields: CustomField[]
): action => {
	return {
		type: "CREATE_SET_SINGLE_RECIPIENT_CERTIFICATE_FIELDS",
		payload: fields,
	};
};

export const setCreateGroupTemplateFields = (
	fields: Array<{
		templateField: CustomField;
		groupField: CustomField;
	}>
): action => {
	return {
		type: "CREATE_SET_GROUP_TEMPLATE_FIELDS",
		payload: fields,
	};
};

export const resetCreateCertificate = (): action => {
	return {
		type: "CREATE_CERTIFICATE_RESET",
		payload: {
			page: 1,
			selectedGroup: undefined,
			selectedTemplate: undefined,
			selectedRecipient: undefined,
			type: "single",
			singleCertificateFields: [],
			groupCertificateFields: [],
		},
	};
};
