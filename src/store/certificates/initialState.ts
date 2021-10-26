//import { IUser } from "../auth/types";
import { certificate } from "./types";

export const initialState: certificatesState = {
	certificates: [],
	currentCertificate: null,
};

export type certificatesState = {
	certificates: certificate[];
	currentCertificate: certificate | null;
};

export type certificateField = {
	name: string;
	value: string;
};
