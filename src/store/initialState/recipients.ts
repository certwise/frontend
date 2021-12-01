import { recipientState } from "../types/recipient";

const initialState: recipientState = {
	all: [],
	groups: [],
	selected: {
		recipients: [],
		group: [],
		certificate: [],
	},
};

export default initialState;
