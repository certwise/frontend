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
