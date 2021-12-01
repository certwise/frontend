import { CustomField } from ".";

export type organization = {
	_id?: string;
	name: string;
	createdBy: string;
	createdAt: Date;
	customFields: Array<CustomField>;
	lastUpdated: Date;
	email: string;
	metaData?: {
		city?: string;
		country?: string;
		address?: string;
		phone?: string;
		state?: string;
		website?: string;
		logo?: string;
		description?: string;
		picture?: string;
		postalCode?: string;
	};
	type?:
		| "Academia"
		| "Enterprise"
		| "Individual"
		| "SMB"
		| { description: string };
};
