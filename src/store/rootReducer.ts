import { action } from ".";
import user from "./auth/reducer";
import { user as authState } from "./auth/types";
import { certificatesState } from "./certificates/initialState";
import templates from "./templates/reducer";
import { templatesState } from "./templates/types";
import recipients from "./recipients/reducer";
import { recipientsState } from "./recipients/types";
const combineReducers = (slices: any) => (state: any, action: action) =>
	Object.keys(slices).reduce(
		// use for..in loop, if you prefer it
		(acc, prop) => ({
			...acc,
			[prop]: slices[prop](acc[prop], action),
		}),
		state
	);
const initialAppState: appState = {
	isLoading: false,
	isInHomePage: true,
	pageTitle: "",
};
const app = (state = initialAppState, action: action): appState => {
	switch (action.type) {
		case "SET_LOADING_STATE":
			return {
				...state,
				isLoading: action.payload,
			};
		case "IS_IN_HOME_PAGE":
			return {
				...state,
				isInHomePage: action.payload,
			};
		case "SET_PAGE_TITLE":
			return {
				...state,
				pageTitle: action.payload,
			};
		default:
			return state;
	}
};

const reducers = {
	app,
	templates,
	user,
	recipients,
};

const rootReducer = combineReducers(reducers);
export default rootReducer;

type appState = {
	isLoading: boolean;
	isInHomePage: boolean;
	pageTitle: string;
};

export type globalState = {
	app: appState;
	templates: templatesState;
	user: authState;
	certificates: certificatesState;
	recipients: recipientsState;
};
