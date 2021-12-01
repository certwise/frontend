import { action, organization } from "../types";

const reducer = (state: organization, action: action): organization => {
	switch (action.type) {
		case "SET_ORGANIZATION":
			return {
				...action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
