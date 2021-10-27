import { useState, useEffect, useContext } from "react";
import "./App.css";
import Template from "./components/templates/template";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Certificate from "./components/certificates/certificate";
import { Switch, Route, Redirect } from "react-router-dom";
import Context from "./store/context";
import { signIn } from "./store";
import TemplateCanvas from "./components/templates/templateCanvas";
import CreateCertificate from "./components/certificates/createCertificate";
import AOS from "aos";
import Navbar from "./components/Navbar";
import Home from "./components/home";
import SignIn from "./components/auth";
//import E404 from "./components/404";

function App() {
	const { store, dispatch }: any = useContext(Context);
	const auth = getAuth();
	const [user, setUser] = useState(store.user || null);

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
						<Navbar isSignedIn={false} />
						<Route exact path="/">
							<LoadingHome />
						</Route>
						<Route path="/signup">
							<SignIn />
						</Route>
						<Route path="/signin" exact>
							<SignIn />
						</Route>
					</>
				)}
				<>
					{store.user.uid && (
						<>
							<Route path="/template/:templateId" exact>
								<TemplateCanvas />
							</Route>
							{!store.templates.currentTemplate.isEditing && (
								<>
									<Navbar isSignedIn />
									<div className="flex h-screen overflow-hidden">
										<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
											<main>
												<Route exact path="/">
													<Redirect to="/admin" />
												</Route>
												<Route exact path="/admin">
													<Home />
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
													<SignIn />
												</Route>
											</main>
										</div>
									</div>
								</>
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
