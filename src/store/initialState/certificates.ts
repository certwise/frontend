import { certificateState } from "../types/certificate";

const initialState: certificateState = {
	all: [],
	groups: [],
	selected: [],
	currentCertificate: undefined,
	createCertificate: {
		page: 1,
		selectedGroup: undefined,
		selectedTemplate: undefined,
		selectedRecipient: undefined,
		type: "single",
		singleCertificateFields: [],
		groupCertificateFields: [],
	},
};

export default initialState;
