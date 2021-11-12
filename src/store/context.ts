import { createContext, Dispatch } from "react";
import { globalState } from "./rootReducer";
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
	recipients: {
		recipients: [],
		selected: [],
	},
};

const Context = createContext<{
	store: globalState;
	dispatch: Dispatch<action>;
}>({ store: initialState, dispatch: () => {} });

export default Context;
