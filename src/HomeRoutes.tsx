import { Redirect, Route, Switch } from "react-router-dom";
import PageNotFoundHome from "./pages/404NoUser";
import Signin from "./pages/signin";
import ResetPassword from "./pages/signin/ResetPassword";
import Signup from "./pages/signup";
import { user } from "./store/types";
function HomeRoutes({ user }: { user: user }) {
	if (user.uid === "" && window.location.pathname === "/")
		return <Redirect to="/signin" />;
	if (user.uid !== "") return <Redirect to="/" />;
	return (
		<>
			{user.uid === "" && (
				<Switch>
					<Route path="/signin">
						<Signin />
					</Route>
					<Route path="/signup">
						<Signup />
					</Route>
					<Route path="/reset-password">
						<ResetPassword />
					</Route>
					<Route path="*">
						<PageNotFoundHome />
					</Route>
				</Switch>
			)}
			{user.uid !== "" && <Redirect to="/" />}
		</>
	);
}

export default HomeRoutes;
