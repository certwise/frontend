import { action } from "..";
import { certificatesState } from "./initialState";
import * as types from "./types";

const reducer = (state: certificatesState, action: action) => {
	switch (action.type) {
		case types.SET_CURRENT_CERTIFICATE:
			return {
				...state,
				currentCertificate: action.payload,
			};

		default:
			return state;
	}
};

export default reducer;
