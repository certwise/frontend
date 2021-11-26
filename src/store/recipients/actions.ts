import { recipient } from "../certificates/types";
import * as types from "./types";

export const addRecipient = (recipient: recipient) => {
	return {
		//type: types.ADD_RECIPIENT,
		payload: recipient,
	};
};
