import { action, organization } from "../types";

export const setOrganization = (organization: organization): action => ({
	type: "SET_ORGANIZATION",
	payload: organization,
});
