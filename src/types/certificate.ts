import { CustomField } from ".";

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
