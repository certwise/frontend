export * as templateActions from "./templates/actions";
export { signIn, signOut } from "./user/actions";

export const setLoading = (state: any) => {
	return {
		type: "SET_LOADING_STATE",
		payload: state,
	};
};
