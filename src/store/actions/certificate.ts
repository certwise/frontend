import { action, CustomField, template } from "../types";

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

export const setCreateGroup = (group: string): action => {
	return {
		type: "CREATE_SET_SELECTEG_GROUP",
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

export const setCreateSingleTemplateFields = (
	fields: CustomField[]
): action => {
	return {
		type: "CREATE_SET_SINGLE_TEMPLATE_FIELDS",
		payload: fields,
	};
};

export const setCreateGroupTemplateFields = (fields: CustomField[]): action => {
	return {
		type: "CREATE_SET_GROUP_TEMPLATE_FIELDS",
		payload: fields,
	};
};
