import { useContext, useEffect } from "react";
import { setPageTitle } from "../../store/actions";
import Context from "../../store/context";
function E404() {
	const { dispatch } = useContext(Context);
	useEffect(() => {
		dispatch(setPageTitle("Page not found"));
		return () => dispatch(setPageTitle(""));
	}, []);
	return <div className=" font-bold text-black text-3xl mt-48">404</div>;
}

export default E404;
