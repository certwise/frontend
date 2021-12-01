import { user } from "../types/user";

const initialState: user = {
	uid: "",
	name: "",
	isVerified: false,
	createdAt: new Date(),
	email: "",
	organization: "",
	updatedAt: new Date(),
	numberOfTemplatesCreated: 0,
	numberOfCerificatesCreated: 0,
};

export default initialState;
