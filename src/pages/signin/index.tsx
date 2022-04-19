import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	deleteUser,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { env } from "../../config";
import { actions, Context } from "../../store";
import { useContext } from "react";
import Header from "../../partials/LandingHeader";
import axios from "axios";
function SignIn() {
	const { dispatch } = useContext(Context);
	const auth = getAuth();
	const [redirect, setRedirect] = useState(false);
	const [form, setform] = useState({
		email: "",
		password: "",
	});
	const signInEmailPassword = async () => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				form.email,
				form.password
			);
			const user = userCredential.user;
			const token = await user.getIdToken();
			const userCheck = await axios({
				url: env.url + "/user/" + user.uid,
				headers: { Authorization: token ? `Bearer ${token}` : "" },
			});
			if (userCheck.data !== false || userCheck.data !== "false") {
				window.location.href = "/";
			} else {
				await deleteUser(user);
				alert(
					"No accounts found for the account please signup for a new account"
				);
			}
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
			dispatch(
				actions.toast.makeToast({
					message: "Incorrect email or password.",
					type: "error",
					duration: "long",
				})
			);
		}
	};
	const signInGoogle = async (e: any) => {
		try {
			e.preventDefault();
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			const token = await user.getIdToken();
			const userCheck = await axios({
				url: env.url + "/user/" + user.uid,
				headers: { Authorization: token ? `Bearer ${token}` : "" },
			});
			if (userCheck.data !== false || userCheck.data !== "false") {
				setRedirect(true);
			} else {
				await deleteUser(result.user);
				alert(
					"No accounts found for the account please signup for a new account"
				);
			}
		} catch (e) {
			console.log(e);
		}
	};
	if (redirect) return <Redirect to="/" />;
	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			<Header />

			{/*  Page content */}
			<main className="flex-grow">
				<section className="bg-gradient-to-b from-gray-100 to-white">
					<div className="max-w-6xl mx-auto px-4 sm:px-6">
						<div className="pt-32 pb-12 md:pt-40 md:pb-20">
							{/* Page header */}
							<div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
								<h1 className="h1 text-black">
									Welcome back. We exist to make credentials easier.
								</h1>
							</div>

							{/* Form */}
							<div className="max-w-sm mx-auto">
								<form
									onSubmit={(e) => {
										e.preventDefault();
										signInEmailPassword();
									}}
								>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-gray-800 text-sm font-medium mb-1"
												htmlFor="email"
											>
												Email
											</label>
											<input
												id="email"
												type="email"
												pattern="[^ @]*@[^ @]*"
												className="form-input w-full text-gray-800"
												placeholder="Enter your email address"
												required
												onChange={(e) =>
													setform({ ...form, email: e.target.value })
												}
												autoComplete="true"
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<div className="flex justify-between">
												<label
													className="block text-gray-800 text-sm font-medium mb-1"
													htmlFor="password"
												>
													Password
												</label>
												<Link
													to="/reset-password"
													className="text-sm font-medium text-blue-600 hover:underline"
												>
													Having trouble signing in?
												</Link>
											</div>
											<input
												id="password"
												type="password"
												className="form-input w-full text-gray-800"
												placeholder="Enter your password"
												required
												onChange={(e) =>
													setform({ ...form, password: e.target.value })
												}
												autoComplete="true"
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<div className="flex justify-between">
												<label className="flex items-center">
													<input
														type="checkbox"
														className="form-checkbox"
														checked={true}
													/>
													<span className="text-gray-600 ml-2">
														Keep me signed in
													</span>
												</label>
											</div>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mt-6">
										<div className="w-full px-3">
											<button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
												Sign in
											</button>
										</div>
									</div>
								</form>
								<div className="flex items-center my-6">
									<div
										className="border-t border-gray-300 flex-grow mr-3"
										aria-hidden="true"
									></div>
									<div className="text-gray-600 italic">Or</div>
									<div
										className="border-t border-gray-300 flex-grow ml-3"
										aria-hidden="true"
									></div>
								</div>
								<form>
									{/* <div className="flex flex-wrap -mx-3 mb-3">
										<div className="w-full px-3">
											<button className="btn px-0 text-white bg-blue-800 hover:bg-blue-700 w-full relative flex items-center">
												<AiFillLinkedin className="w-5 h-5 fill-current text-white opacity-75 flex-shrink-0 mx-4" />
												<span className="flex-auto pl-16 pr-8 -ml-16">
													Continue with LinkedIn
												</span>
											</button>
										</div>
									</div> */}
									<div className="flex flex-wrap">
										<div className="w-full">
											<button
												onClick={(e) => signInGoogle(e)}
												className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center"
											>
												<AiOutlineGoogle className="w-5 h-5 fill-current text-white opacity-75 flex-shrink-0 ml-8" />
												<span className="flex-auto  pr-8 ">
													Continue with Google
												</span>
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default SignIn;
