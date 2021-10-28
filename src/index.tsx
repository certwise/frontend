import ReactDOM from "react-dom";
import App from "./App";
import StoreProvider from "./store/StoreProvider";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
const Store = () => {
	return (
		<StoreProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</StoreProvider>
	);
};

ReactDOM.render(<Store />, document.getElementById("root"));
