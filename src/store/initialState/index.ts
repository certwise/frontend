import { globalState } from "../types/store";
import templates from "./template";
import user from "./user";
import organization from "./organization";
import certificates from "./certificates";
import recipients from "./recipients";
import toasts from "./toast";
const initialState: globalState = {
	templates,
	user,
	organization,
	certificates,
	recipients,
	toasts,
};

export default initialState;
