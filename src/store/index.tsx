import { createContext, Dispatch, useReducer, Reducer } from "react";
import { action, globalState } from "./types/store";
import initialState from "./initialState";
import reducer from "./reducers";

export const Context = createContext<{
	store: globalState;
	dispatch: Dispatch<action>;
}>({ store: initialState, dispatch: () => {} });

const useStore = (): {
	store: globalState;
	dispatch: Dispatch<action>;
} => {
	const [store, dispatch] = useReducer<Reducer<globalState, action>>(
		reducer,
		initialState
	);
	return { store, dispatch };
};

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
	const { store, dispatch } = useStore();
	return (
		<Context.Provider value={{ store, dispatch }}>{children}</Context.Provider>
	);
};

export * as actions from "./actions";
export * as types from "./types";
