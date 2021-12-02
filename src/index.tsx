import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./css/style.scss";
import * as serviceWorker from "./serviceWorker";
import { StoreProvider } from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import dotenv from "dotenv";
dotenv.config();
Sentry.init({
	dsn: "https://f94ad24a78d94e80b5899e1b9c851cd1@sentry.certwise.app/3",
	integrations: [new Integrations.BrowserTracing()],
	environment: process.env.REACT_APP_SENTRY_ENV,
	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,
});

const queryClient = new QueryClient();

ReactDOM.render(
	<StoreProvider>
		<BrowserRouter>
			<React.StrictMode>
				<Router>
					<QueryClientProvider client={queryClient}>
						<App />
					</QueryClientProvider>
				</Router>
			</React.StrictMode>
		</BrowserRouter>
	</StoreProvider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
