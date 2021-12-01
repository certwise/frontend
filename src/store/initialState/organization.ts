import { organization } from "../types/organization";

const initialstate: organization = {
	name: "",
	createdBy: "",
	createdAt: new Date(),
	customFields: [],
	lastUpdated: new Date(),
	email: "",
};

export default initialstate;
