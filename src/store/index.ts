export * as templateActions from "./templates/actions";
export { signIn, signOut } from "./auth/actions";

export const setLoading = (state: any) => {
	return {
		type: "SET_LOADING_STATE",
		payload: state,
	};
};

export interface IAction {
	type: string;
	payload?: any;
	description?: string;
}
