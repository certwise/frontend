import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./css/style.scss";
import * as serviceWorker from "./serviceWorker";
import StoreProvider from "./store/StoreProvider";

ReactDOM.render(
	<StoreProvider>
		<BrowserRouter>
			<React.StrictMode>
				<Router>
					<App />
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
