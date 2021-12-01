import { certificateState } from "../types/certificate";

const initialState: certificateState = {
	all: [],
	groups: [],
	selected: [],
	currentCertificate: false,
	createCertificate: {
		page: 1,
		selectedGroup: false,
		selectedTemplate: false,
		selectedRecipient: false,
		type: "single",
		singleCertificateFields: [],
		groupCertificateFields: [],
	},
};

export default initialState;
