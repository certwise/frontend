import { action } from "../types";
import { Toast } from "../types/toast";

export const makeToast = (toast: Toast): action => {
	return {
		type: "MAKE_TOAST",
		payload: toast,
	};
};

export const removeToast = (id: number): action => {
	return {
		type: "REMOVE_TOAST",
		payload: id,
	};
};

export const clearAllToast = (): action => {
	return {
		type: "REMOVE_ALL_TOAST",
		payload: null,
	};
};
