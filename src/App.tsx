import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./css/style.scss";
import { focusHandling } from "cruip-js-toolkit";
import "./charts/ChartjsConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import Routes from "./Routes";
import HomeRoutes from "./HomeRoutes";
import { signIn } from "./store";
import Context from "./store/context";
import { user } from "./store/user/types";
import { useGet } from "./api/user";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
	const { store, dispatch } = useContext(Context);
	const location = useLocation();
	const auth = getAuth();
	const [user, setUser] = useState<user | any>({ uid: "" });
	const [userStatus, setUserStatus] = useState<
		"loading" | "no_user" | "user_found"
	>("loading");
	const getUser = useGet(user.uid);
	useEffect(() => {
		(document.querySelector("html") as any).style.scrollBehavior = "auto";
		window.scroll({ top: 0 });
		(document.querySelector("html") as any).style.scrollBehavior = "";
		focusHandling();
	}, [location.pathname]); // triggered on route change
	useEffect(() => {
		onAuthStateChanged(auth, (user_obj) => {
			if (user_obj) {
				setUser(user_obj);
			} else {
				console.log("user is null");
				setUserStatus("no_user");
			}
		});
	});
	useEffect(() => {
		if (user.uid !== "") {
			if (getUser.data?.data.uid) {
				dispatch(signIn(getUser.data.data));
				setUserStatus("user_found");
			}
		}
	}, [user]);

	useEffect(() => {
		if (getUser.data?.data._id) {
			dispatch(signIn(getUser.data.data));
			setUserStatus("user_found");
		}
		if (user.uid !== "" && getUser.isError) {
			setUserStatus("no_user");
		}
	}, [getUser.data]);

	useEffect(() => console.log("userStatus", userStatus));

	return (
		<>
			{userStatus === "loading" && <div>Loading</div>}
			{userStatus === "user_found" && <Routes user={store.user} />}
			{userStatus === "no_user" && <HomeRoutes user={store.user} />}
			<ReactQueryDevtools initialIsOpen={false} position="top-right" />
		</>
	);
}

export default App;
