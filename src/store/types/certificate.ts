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
	currentCertificate: certificate | false;
	createCertificate: {
		page: 1 | 2 | 3;
		selectedGroup: group | false;
		selectedTemplate: template | false;
		selectedRecipient: recipient | false;
		type: "single" | "group";
		singleCertificateFields: CustomField[] | false;
		groupCertificateFields: CustomField[] | false;
	};
}
