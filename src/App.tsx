import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./css/style.scss";
import { focusHandling } from "cruip-js-toolkit";
import "./charts/ChartjsConfig";
import { QueryClient, QueryClientProvider } from "react-query";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import Routes from "./Routes";
import HomeRoutes from "./HomeRoutes";
import { signIn } from "./store";
import Context from "./store/context";
import { user } from "./store/auth/types";
import { getUser } from "./api/userQueries";
const queryClient = new QueryClient();
function App() {
	const { store, dispatch } = useContext(Context);
	const location = useLocation();
	const auth = getAuth();
	const [user, setUser] = useState<user | any>({ uid: "" });
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
			}
		});
	});
	useEffect(() => {
		if (user.uid !== "") {
			getUser(user.uid).then((res) => {
				if (res) {
					dispatch(signIn(res));
				}
			});
		}
	}, [user]);

	return (
		<>
			<QueryClientProvider client={queryClient}>
				{store.user.uid !== "" && <Routes user={store.user} />}
				{store.user.uid === "" && <HomeRoutes user={store.user} />}
			</QueryClientProvider>
		</>
	);
}

export default App;
