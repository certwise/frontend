import Dashboard from "./pages/Dashboard";
import Recipients from "./pages_/recipients/Recipients";
import Templates from "./pages_/templates";
import CreateTemplate from "./pages_/template/CreateTemplate";
import Template from "./pages_/template";
import Builder from "./pages_/template/Builder";
import Certificate from "./pages_/certificate";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { user } from "./store/user/types";
import { useEffect, useState } from "react";
import Onboarding1 from "./pages_/signup/Onboarding01";
import Onboarding2 from "./pages_/signup/Onboarding02";
import Onboarding3 from "./pages_/signup/Onboarding03";
import Groups from "./pages_/recipients/Groups";
import Group from "./pages_/group";
import Certificates from "./pages_/certificates";
import PageNotFound from "./pages/404";
import Calendar from "./pages/Calendar";
import Account from "./pages/settings/Account";
import Notifications from "./pages/settings/Notifications";
import Apps from "./pages/settings/Apps";
import Plans from "./pages/settings/Plans";
import Billing from "./pages/settings/Billing";
import Feedback from "./pages/settings/Feedback";
import CreateCertificate from "./pages_/certificates/CreateCertificate";

function Routes({ user }: { user: user }) {
	const path = useLocation();
	const [redirect, setRedirect] = useState("");
	useEffect(() => {
		if (user.organization === "") setRedirect("/onboard-organization");
		return () => {};
	}, [user]);
	if (redirect && !path.pathname.includes("onboard"))
		return <Redirect push to="/onboard-organization" />;
	else
		return (
			<>
				{user.organization === "" && (
					<Switch>
						<Route path="/onboard-organization">
							<Onboarding1 />
						</Route>
						<Route path="/onboard-organization-details">
							<Onboarding2 />
						</Route>
					</Switch>
				)}
				{user.organization !== "" && (
					<Switch>
						<Route path="/onboard">
							<Onboarding3 />
						</Route>
						<Route exact path="/certificate">
							<Certificate />
						</Route>
						<Route exact path="/certificates/list">
							<Certificates />
						</Route>
						<Route exact path="/certificates/create">
							<CreateCertificate />
						</Route>
						<Route exact path="/recipients/list">
							<Recipients />
						</Route>
						<Route exact path="/recipients/groups">
							<Groups />
						</Route>
						<Route exact path="/group/:id">
							<Group />
						</Route>
						<Route exact path="/templates">
							<Templates />
						</Route>
						<Route exact path="/template/create">
							<CreateTemplate uid={user.uid} organization={user.organization} />
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
						<Route exact path="/calendar">
							<Calendar />
						</Route>
						<Route exact path="/account">
							<Account />
						</Route>
						<Route exact path="/account/notifications">
							<Notifications />
						</Route>
						<Route exact path="/account/apps">
							<Apps />
						</Route>
						<Route exact path="/account/plans">
							<Plans />
						</Route>
						<Route exact path="/account/billing">
							<Billing />
						</Route>
						<Route exact path="/account/feedback">
							<Feedback />
						</Route>
						<Route path="*">
							<PageNotFound />
						</Route>
					</Switch>
				)}
			</>
		);
}

export default Routes;
