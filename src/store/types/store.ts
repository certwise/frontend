import { certificateState } from "./certificate";
import { organization } from "./organization";
import { recipientState } from "./recipient";
import { templatesState } from "./template";
import { Toast } from "./toast";
import { user } from "./user";

export type action = {
	type: string;
	payload: any;
	description?: string;
};

export type globalState = {
	templates: templatesState;
	user: user;
	organization: organization;
	certificates: certificateState;
	recipients: recipientState;
	toasts: Toast[];
};
