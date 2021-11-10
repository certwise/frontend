import { Link, Route, Switch } from "react-router-dom";
import Signin from "./pages_/signin";
import Signup from "./pages_/signup";
import OnboardingDetails1 from "./pages_/signup/Onboarding01";
import Onboarding03 from "./pages_/signup/Onboarding02";
import Onboarding04 from "./pages_/signup/Onboarding03";
import { user } from "./store/auth/types";
function HomeRoutes({ user }: { user: user }) {
	console.log("USer", user);
	return (
		<>
			{user.uid === "" && (
				<Switch>
					<Route exact path="/">
						<Link
							className="mt-2 btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap"
							to="/signin"
						>
							<button>Signin</button>
						</Link>
						<Link
							className="mt-2 btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap"
							to="/signup"
						>
							<button>Signup</button>
						</Link>
						<h1 className="text-xl m-3">Home</h1>
					</Route>
					<Route path="/signin">
						<Signin />
					</Route>
					<Route path="/signup">
						<Signup />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default HomeRoutes;
