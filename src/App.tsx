import { useState, useEffect, useContext } from "react";
import "./App.css";
import Template from "./pages/templates/template";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Certificate from "./pages/certificates/certificate";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Context from "./store/context";
import { signIn } from "./store";
import TemplateCanvas from "./pages/templates/templateCanvas";
import CreateCertificate from "./pages/certificates/createCertificate";
import AOS from "aos";
import Home from "./pages/home/home";
import SignIn from "./pages/SignIn";
import Payments from "./pages/payments";
import { focusHandling } from "cruip-js-toolkit";
import "./css/style.scss";
import SignUp from "./pages/SignUp";
import Auth from "./pages/user/auth";
import Dashboard from "./pages/admin/Dashboard";
import Header from "./partials/admin/Header";
import Sidebar from "./partials/admin/Sidebar";
//import E404 from "./components/404";
function App() {
	const location = useLocation();
	const { store, dispatch }: any = useContext(Context);
	const auth = getAuth();
	const [user, setUser] = useState(store.user || null);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	let icon = document.createElement("link");
	icon.rel = "icon";
	icon.href = "./images/certificate.png";
	icon.type = "image/gif";
	document.head.appendChild(icon);
	useEffect(() => {
		onAuthStateChanged(auth, (user_obj) => {
			if (user_obj) {
				setUser(user_obj);
			} else {
				console.log("No user");
			}
		});
		AOS.init({
			once: true,
			disable: "phone",
			duration: 700,
			easing: "ease-out-cubic",
		});
	});
	useEffect(() => {
		dispatch(signIn(user));
		console.log("UserId from App.js", user.uid);
	}, [user]);
	useEffect(() => {
		(document.querySelector("html") as any).style.scrollBehavior = "auto";
		window.scroll({ top: 0 });
		(document.querySelector("html") as any).style.scrollBehavior = "";
		focusHandling();
	}, [location.pathname]); // triggered on route change

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
			{!store.user.uid && (
				<>
					<Switch>
						<Route exact path="/">
							<Home />
							dfdf
						</Route>
						<Route path="/signin" exact>
							<SignIn />
						</Route>
						<Route path="/signup">
							<SignUp />
						</Route>
					</Switch>
				</>
			)}
			<>
				{store.user.uid && (
					<>
						<Switch>
							<Route path="/template/:templateId" exact>
								<TemplateCanvas />
								{store.templates.currentTemplate.isEditing && <></>}
							</Route>
						</Switch>
						{!store.templates.currentTemplate.isEditing &&
							!location.pathname.includes("/template/") && (
								<>
									<div className="flex h-screen overflow-hidden">
										{/* Sidebar */}
										<Sidebar
											sidebarOpen={sidebarOpen}
											setSidebarOpen={setSidebarOpen}
										/>

										{/* Content area */}
										<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
											{/*  Site header */}
											<Header
												sidebarOpen={sidebarOpen}
												setSidebarOpen={setSidebarOpen}
											/>

											<main>
												<Switch>
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
													<Route exact path="/user">
														<Auth />
													</Route>
													<Route path="/payments">
														<Payments />
													</Route>
													<Route>404</Route>
												</Switch>
											</main>
										</div>
									</div>
								</>
							)}
					</>
				)}
			</>
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
