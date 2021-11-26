import { CustomField } from ".";

export type group = {
	_id?: string;
	name: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	organization: string;
	createdBy: string;
	customFields: CustomField[];
	color: string;
};
