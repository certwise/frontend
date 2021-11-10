import Dashboard from "./pages/Dashboard";
import Recipients from "./pages_/recipients/Recipients";
import Templates from "./pages_/templates";
import CreateTemplate from "./pages_/template/CreateTemplate";
import Template from "./pages_/template";
import Builder from "./pages_/template/Builder";
import Certificate from "./pages_/certificate";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { user } from "./store/auth/types";
import { useEffect, useState } from "react";
import Onboarding1 from "./pages_/signup/Onboarding01";
import Onboarding2 from "./pages_/signup/Onboarding02";
import Onboarding3 from "./pages_/signup/Onboarding03";

function Routes({ user }: { user: user }) {
	const path = useLocation();
	const [redirect, setRedirect] = useState("");
	useEffect(() => {
		if (user.institution === "") setRedirect("/onboard-organization");
		return () => {};
	}, [user]);
	if (redirect && !path.pathname.includes("onboard"))
		return <Redirect push to="/onboard-organization" />;
	else
		return (
			<>
				{true && (
					<Switch>
						<Route path="/onboard-organization">
							<Onboarding1 />
						</Route>
						<Route path="/onboard-organization-details">
							<Onboarding2 />
						</Route>
						<Route path="/onboard">
							<Onboarding3 />
						</Route>
					</Switch>
				)}
				{user.institution !== "" && (
					<Switch>
						<Route exact path="/certificate">
							<Certificate />
						</Route>
						<Route exact path="/recipients/list">
							<Recipients />
						</Route>
						<Route exact path="/templates">
							<Templates />
						</Route>
						<Route exact path="/template/create">
							<CreateTemplate uid={user.uid} />
						</Route>
						<Route exact path="/template/edit/:id">
							<Builder />
						</Route>
						<Route exact path="/template/view/:id">
							<Template />
						</Route>
						<Route exact path="/">
							<Dashboard />
						</Route>
					</Switch>
				)}
			</>
		);
}

export default Routes;
