import Dashboard from "./pages/Dashboard";
import Recipients from "./pages/recipients/Recipients";
import Templates from "./pages/templates";
import CreateTemplate from "./pages/template/CreateTemplate";
import Template from "./pages/template";
import Builder from "./pages/template/Builder";
import Certificate from "./pages/certificate";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { user } from "./store/types";
import { useEffect, useState } from "react";
import Onboarding1 from "./pages/signup/Onboarding01";
import Onboarding2 from "./pages/signup/Onboarding02";
import Onboarding3 from "./pages/signup/Onboarding03";
import Groups from "./pages/recipients/Groups";
import Group from "./pages/group";
import Certificates from "./pages/certificates";
import PageNotFound from "./pages/404";
import Account from "./pages/settings/Account";
// import Plans from "./pages/settings/Plans";
// import Billing from "./pages/settings/Billing";
import Feedback from "./pages/settings/Feedback";
import Create from "./pages/certificates/create";
import Organization from "./pages/settings/Organization";
import CSVRecipients from "./pages/recipients/CSV";
function Routes({ user }: { user: user }) {
	const path = useLocation();
	const [redirect, setRedirect] = useState("");
	useEffect(() => {
		if (user.uid !== "" && user.organization === "")
			setRedirect("/onboard-organization");
		if (user.uid === "") {
			setRedirect("");
		}
		return () => {};
	}, [user]);
	if (redirect !== "" && !path.pathname.includes("onboard"))
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
							<Create />
						</Route>
						<Route exact path="/recipients/list">
							<Recipients />
						</Route>
						<Route exact path="/recipients/groups">
							<Groups />
						</Route>
						<Route exact path="/recipients/import-csv">
							<CSVRecipients />
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
						<Route exact path="/account">
							<Account />
						</Route>
						<Route exact path="/account/organization">
							<Organization />
						</Route>
						{/* <Route exact path="/account/plans">
							<Plans />
						</Route> */}
						{/* <Route exact path="/account/billing">
							<Billing />
						</Route> */}
						<Route exact path="/account/feedback">
							<Feedback />
						</Route>
						<Route path="/signin">
							<Redirect to="/" />
						</Route>
						<Route path="/signup">
							<Redirect to="/" />
						</Route>
						<Route path="/reset-password">
							<Redirect to="/" />
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
