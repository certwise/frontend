import { useState, useEffect, useContext } from "react";
import "./App.css";
import Template from "./components/templates/template";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Certificate from "./components/certificates/certificate";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import Context from "./store/context";
import { signIn } from "./store";
import TemplateCanvas from "./components/templateCanvas";
import CreateCertificate from "./components/certificates/createCertificate";
import "./css/style.scss";
import Home from "./pages/home/Home";
import SignIn from "./pages/home/SignIn";
import ResetPassword from "./pages/home/ResetPassword";
import Dashboard from "./pages/admin/Dashboard";
import Sidebar from "./partials/admin/Sidebar";
import Header from "./partials/admin/Header";
import SignUp from "./pages/home/SignUp";
import AOS from "aos";
function App() {
	const { store, dispatch }: any = useContext(Context);
	const auth = getAuth();
	const [user, setUser] = useState(store.user || null);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, (user_obj) => {
			if (user_obj) {
				setUser(user_obj);
			} else {
				console.log("No user");
			}
		});
	});
	useEffect(() => {
		dispatch(signIn(user));
		console.log("UserId from App.js", user.uid);
	}, [user]);

	useEffect(() => {
		AOS.init({
			once: true,
			disable: "phone",
			duration: 700,
			easing: "ease-out-cubic",
		});
	});

	return (
		<>
			<Switch>
				{!store.user.uid && (
					<>
						<Route exact path="/">
							<LoadingHome />
						</Route>
						<Route path="/signup">
							<SignUp />
						</Route>
						<Route path="/signin" exact>
							<SignIn />
						</Route>
					</>
				)}
				<>
					{store.user.uid && (
						<>
							{
								<Route path="/template/:templateId" exact>
									<TemplateCanvas />
								</Route>
							}
							{!store.templates.currentTemplate.isEditing && (
								<div className="flex h-screen overflow-hidden">
									<Sidebar
										sidebarOpen={sidebarOpen}
										setSidebarOpen={setSidebarOpen}
									/>
									<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
										<Header
											sidebarOpen={sidebarOpen}
											setSidebarOpen={setSidebarOpen}
										/>
										<main>
											<Route exact path="/">
												<Redirect to="/admin" />
											</Route>
											<Route exact path="/admin">
												<Dashboard />
											</Route>
											<Route path="/templates" exact>
												<Template />
											</Route>
											<Route path="/certificates" exact>
												<Certificate />
											</Route>
											<Route exact path="/certificate/create/:name">
												<CreateCertificate />
											</Route>
											<Route exact path="/reset-password">
												<ResetPassword />
											</Route>
											<Route exact path="/home">
												<Home />
											</Route>
											<Route exact path="/certificate/create/:name">
												<CreateCertificate />
											</Route>
										</main>
									</div>
								</div>
							)}
						</>
					)}
				</>
			</Switch>
		</>
	);
}

export default App;

const LoadingHome = () => {
	const [loading, setLoading] = useState(true);
	setTimeout(() => {
		setLoading(false);
	}, 1000);
	return (
		<>
			{!loading && <Home />}
			{loading && (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: window.innerHeight * 0.9,
					}}
				>
					<button className="btn btn-xl btn-circle loading"></button>
				</div>
			)}
		</>
	);
};
