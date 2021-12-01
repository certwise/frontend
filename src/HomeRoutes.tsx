import { Link, Route, Switch } from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import { user } from "./store/types";
function HomeRoutes({ user }: { user: user }) {
	return (
		<>
			{user.uid === "" && (
				<Switch>
					<Route exact path="/">
						<Link
							className="mt-2 btn bg-blue-500 hover:bg-blue-600 text-white ml-3 whitespace-nowrap"
							to="/signin"
						>
							<button>Signin</button>
						</Link>
						<Link
							className="mt-2 btn bg-blue-500 hover:bg-blue-600 text-white ml-3 whitespace-nowrap"
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
