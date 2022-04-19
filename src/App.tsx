import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./css/style.scss";
import { focusHandling } from "cruip-js-toolkit";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import Routes from "./Routes";
import HomeRoutes from "./HomeRoutes";
import { actions, types } from "./store";
import { Context } from "./store";
import { useGet } from "./api/user";
import Toast from "./partials/Toast";
import dotenv from "dotenv";
import Loader from "./partials/Loader";
import { getAnalytics, logEvent } from "firebase/analytics";

dotenv.config();
function App() {
	const { store, dispatch } = useContext(Context);
	const location = useLocation();
	const auth = getAuth();
	const [user, setUser] = useState<types.user | any>({ uid: "" });
	const [userStatus, setUserStatus] = useState<
		"loading" | "no_user" | "user_found"
	>("loading");
	const analytics = getAnalytics();
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
		logEvent(analytics, "Log");
	});
	useEffect(() => {
		if (user.uid !== "") {
			if (getUser.data?.data.uid) {
				dispatch(actions.user.signIn(getUser.data.data));
				setUserStatus("user_found");
			}
		}
	}, [dispatch, getUser.data, user]);

	useEffect(() => {
		if (getUser.data?.data._id) {
			dispatch(actions.user.signIn(getUser.data.data));
			setUserStatus("user_found");
		}
		if (user.uid !== "" && getUser.isError) {
			setUserStatus("no_user");
		}
	}, [dispatch, getUser.data, getUser.isError, user.uid]);

	return (
		<>
			{userStatus === "loading" && (
				<div className="h-screen flex  justify-center items-center">
					<Loader />
				</div>
			)}
			{userStatus === "user_found" && <Routes user={store.user} />}
			{userStatus === "no_user" && <HomeRoutes user={store.user} />}
			<div
				style={{ top: 100, zIndex: 100, position: "fixed" }}
				className="absolute top-0 right-0 text-red-500 font-bold text-2xl flex flex-col"
			>
				<Toast />
			</div>
		</>
	);
}

export default App;
