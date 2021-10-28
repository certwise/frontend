import axios from "axios";
import { useState } from "react";
import { Link, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Pricing from "./Pricing";

function Payments() {
	let { url, path } = useRouteMatch();
	const clientSecret = new URLSearchParams(window.location.search).get(
		"payment_intent_client_secret"
	);
	const status = new URLSearchParams(window.location.search).get("status");

	if (status === "success") return Success();
	if (status === "cancel") return Fail();
	else
		return (
			<>
				<Switch>
					<Route exact path={path}>
						<Pricing />
					</Route>
					<Route exact path={`${path}/fail`}>
						<Fail />
					</Route>
					<Route exact path={`${path}/success`}>
						<Success />
					</Route>
					<Route path="*">
						<Redirect to={path} />
					</Route>
				</Switch>
			</>
		);
}

export default Payments;

const Success = () => {
	return (
		<div>
			<h1 className="text-4xl text-success mt-10">Payment success</h1>
			<Link to="/user">Your Profile</Link>
		</div>
	);
};
const Fail = () => {
	return (
		<div>
			<h1 className="text-2xl text-error">Payment failed</h1>
			<Link to="/payments">Back to Payments</Link>
		</div>
	);
};
