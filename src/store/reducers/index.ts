import { action } from "../types/store";
import templates from "./template";
import userReducer from "./user";
import recipients from "./recipient";
import toasts from "./toast";
import organization from "./organization";
import certificates from "./certificate";

const combineReducers = (slices: any) => (state: any, action: action) =>
	Object.keys(slices).reduce(
		// use for..in loop, if you prefer it
		(acc, prop) => ({
			...acc,
			[prop]: slices[prop](acc[prop], action),
		}),
		state
	);

const reducers = {
	templates,
	user: userReducer,
	recipients,
	toasts,
	organization,
	certificates,
};

const rootReducer = combineReducers(reducers);
export default rootReducer;
