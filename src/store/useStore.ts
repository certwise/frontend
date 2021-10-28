import { Reducer, useReducer } from "react";
import rootReducer, { globalState } from "./rootReducer";

import { initialState as user } from "./auth/reducer";
import { initialState as templates } from "./templates/initialState";
import { action } from ".";

const initialState: globalState = {
	app: {
		isLoading: false,
		isInHomePage: true,
		pageTitle: "",
	},
	user,
	templates,
	certificates: {
		certificates: [],
		currentCertificate: null,
	},
};

const useStore = () => {
	const [store, dispatch] = useReducer<Reducer<globalState, action>>(
		rootReducer,
		initialState
	);
	return { store, dispatch };
};

export default useStore;
