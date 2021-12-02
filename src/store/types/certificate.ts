import { CustomField, group, organization, recipient, template } from ".";

export type certificate = {
	_id?: string;
	issuer: string;
	organization: string;
	isIssued: boolean;
	templateId: string;
	createdAt: Date;
	lastUpdated: Date;
	issueDate: Date | false;
	recipient: string;
	fields: Array<CustomField>;
	group: string | false;
	validTill: Date | false;
	storageRef?: string;
	isRevoked: boolean;
};

export interface certificateState {
	all: certificate[];
	groups: Array<{
		[key: string]: certificate[];
	}>;
	selected: certificate[];
	currentCertificate: certificate | undefined;
	createCertificate: {
		page: 1 | 2 | 3;
		selectedGroup: group | undefined;
		selectedTemplate: template | undefined;
		selectedRecipient: recipient | undefined;
		type: "single" | "group";
		singleCertificateFields: CustomField[];
		groupCertificateFields:
			| Array<{
					templateField: CustomField;
					groupField: CustomField;
			  }>
			| false;
	};
}
