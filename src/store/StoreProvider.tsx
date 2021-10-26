import useStore from "./useStore";
import Context from "./context";

const StoreProvider: any = ({ children }: any) => {
	const store_ = useStore();
	return (
		<Context.Provider
			value={{ store: store_.store, dispatch: store_.dispatch }}
		>
			{children}
		</Context.Provider>
	);
};
export default StoreProvider;
