import { IAction } from "..";
import { ICertificatesState } from "./initialState";
import * as types from "./types";

const reducer = (state: ICertificatesState, action: IAction) => {
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
