// import { Link } from "react-router-dom";
// import { AiFillLinkedin, AiOutlineGoogle } from "react-icons/ai";

import {
	getAuth,
	createUserWithEmailAndPassword,
	// GoogleAuthProvider,
	// signInWithPopup,
	deleteUser,
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useCreate as useCreateUser } from "../../api/user";
import { user } from "../../store/types";
import LandingHeader from "../../partials/LandingHeader";
import { Context } from "../../store";
import { toast } from "../../store/actions";
import { valiateEarlyAccessInviteCode } from "../../api";
// import { id } from "monk";

function SignUp() {
	const { dispatch } = useContext(Context);
	const [redirect, setredirect] = useState(false);
	const create = useCreateUser();
	const [form, setForm] = useState({
		inviteCode: "",
		email: "",
		password: "",
		name: "",
		confirmPassword: "",
		phone: "",
	});
	const auth = getAuth();
	useEffect(() => {
		if (create.isError) {
			alert(create.error);
			const user = getAuth().currentUser;
			if (user) deleteUser(user);
		}
	}, [create.isError]);
	const signUp = async (e: any) => {
		let user: any;
		e.preventDefault();
		const isValidInviteCode = await valiateEarlyAccessInviteCode(
			form.email,
			form.inviteCode
		);
		if (
			form.password === form.confirmPassword &&
			form.password.length > 7 &&
			form.name.length > 0 &&
			form.email.length > 0
		) {
			if (!isValidInviteCode) {
				dispatch(
					toast.makeToast({
						message:
							"Invalid invite code. Please check your invite code or request for an invite code if you do not have one.",
						duration: "long",
						type: "error",
					})
				);
			} else {
				createUserWithEmailAndPassword(auth, form.email, form.password)
					.then((userCredential) => {
						// Signed in
						const user_ = userCredential.user;
						user = user_;
						let x: user = {
							uid: user.uid,
							name: form.name,
							isVerified: false,
							createdAt: new Date(),
							email: user.email || form.email,
							organization: "",
							updatedAt: new Date(),
							numberOfTemplatesCreated: 0,
							numberOfCerificatesCreated: 0,
							phoneNumber: form.phone,
						};
						create.mutate(x);
						setredirect(true);
					})
					.catch((error) => {
						const errorCode = error.code;
						if (errorCode === "auth/email-already-in-use") {
							dispatch(
								toast.makeToast({
									message: "Email already in use",
									duration: "short",
									type: "warning",
								})
							);
						} else {
							dispatch(
								toast.makeToast({
									message:
										"Something went wrong. Please reach out to us to get this fixed immediately.",
									duration: "long",
									type: "error",
								})
							);
						}
						// ..
					});
			}
		} else {
			alert("Please enter valid details");
		}
	};
	// const signUpGoogle = async (e: any) => {
	// 	let result;
	// 	e.preventDefault();
	// 	try {
	// 		const provider = new GoogleAuthProvider();
	// 		const result_ = await signInWithPopup(auth, provider);
	// 		result = result_;
	// 		const user = result.user;
	// 		let x: user = {
	// 			uid: user.uid,
	// 			name: user.displayName || "CertwiseDefaultUser",
	// 			isVerified: false,
	// 			createdAt: new Date(),
	// 			email: user.email || "",
	// 			organization: "",
	// 			updatedAt: new Date(),
	// 			numberOfTemplatesCreated: 0,
	// 			numberOfCerificatesCreated: 0,
	// 		};
	// 		create.mutate(x);
	// 		setredirect(true);
	// 	} catch (e) {
	// 		console.log(e);
	// 		if (result) {
	// 			await deleteUser(result.user);
	// 		}
	// 	}
	// };
	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			{/*  Site header */}
			<LandingHeader />

			{/*  Page content */}
			<main className="bg-white flex-grow">
				<section className="bg-gradient-to-b from-warmGray-100 to-white">
					<div className="max-w-6xl mx-auto px-4 sm:px-6">
						<div className="pt-2 pb-12 md:pt-40 md:pb-20">
							{/* Page header */}
							<div className="max-w-3xl mx-auto text-center pb-8 md:pb-20">
								<h1 className="h1">
									Welcome. We exist to make credentials easier.
								</h1>
							</div>

							{/* Form */}
							<div className="max-w-sm mx-auto">
								<form>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-gray-800 text-sm font-medium mb-1"
												htmlFor="name"
											>
												Invite Code <span className="text-red-600">*</span>
											</label>
											<input
												id="name"
												type="text"
												className="form-input w-full text-gray-800 mb-2"
												placeholder="Enter your invite code"
												required
												onChange={(e) =>
													setForm({ ...form, inviteCode: e.target.value })
												}
											/>
											<span className="text-sm mt-4">
												Don't have an invite code?{" "}
												<a
													target="_blank"
													rel="noopener noreferrer"
													className="text-blue-500 hover:text-blue-600 hover:underline"
													href="https://certwise.app/early-access"
												>
													Apply for early access
												</a>
											</span>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-gray-800 text-sm font-medium mb-1"
												htmlFor="name"
											>
												Name <span className="text-red-600">*</span>
											</label>
											<input
												id="name"
												type="text"
												className="form-input w-full text-gray-800"
												placeholder="Enter your name"
												required
												onChange={(e) =>
													setForm({ ...form, name: e.target.value })
												}
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-gray-800 text-sm font-medium mb-1"
												htmlFor="email"
											>
												Email <span className="text-red-600">*</span>
											</label>
											<input
												id="email"
												type="email"
												className="form-input w-full text-gray-800"
												placeholder="Enter your email address"
												required
												onChange={(e) =>
													setForm({ ...form, email: e.target.value })
												}
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-gray-800 text-sm font-medium mb-1"
												htmlFor="email"
											>
												Phone <span className="text-red-600">*</span>
											</label>
											<input
												id="email"
												type="tel"
												className="form-input w-full text-gray-800"
												placeholder="Enter your phone number"
												required
												onChange={(e) =>
													setForm({ ...form, phone: e.target.value })
												}
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-gray-800 text-sm font-medium mb-1"
												htmlFor="password"
											>
												Password <span className="text-red-600">*</span>
											</label>
											<input
												id="password"
												type="password"
												className="form-input w-full text-gray-800"
												placeholder="Enter your password"
												required
												onChange={(e) =>
													setForm({ ...form, password: e.target.value })
												}
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mb-4">
										<div className="w-full px-3">
											<label
												className="block text-gray-800 text-sm font-medium mb-1"
												htmlFor="password"
											>
												Confirm password <span className="text-red-600">*</span>
											</label>
											<input
												id="password"
												type="password"
												className="form-input w-full text-gray-800"
												placeholder="Enter your password"
												required
												onChange={(e) =>
													setForm({ ...form, confirmPassword: e.target.value })
												}
											/>
										</div>
									</div>
									<div className="flex flex-wrap -mx-3 mt-6">
										<div className="w-full px-3">
											{!create.isLoading && (
												<button
													onClick={(e) => signUp(e)}
													className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
												>
													Sign up
												</button>
											)}
											{create.isLoading && (
												<button className="btn text-white bg-blue-200 w-full">
													Signing up...
												</button>
											)}
										</div>
									</div>
									<div className="text-sm text-gray-500 text-center mt-3">
										By creating an account, you agree to the{" "}
										<a className="underline" href="#0">
											terms &amp; conditions
										</a>
										, and our{" "}
										<a className="underline" href="#0">
											privacy policy
										</a>
										.
									</div>
								</form>
								<div className="flex items-center my-6">
									<div
										className="border-t border-gray-300 flex-grow mr-3"
										aria-hidden="true"
									></div>
									<div className="text-gray-600 italic">
										You can sign in via Google later after you sign up with your
										email (if your email is supported by Google)
									</div>
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
									</div> 
									<div className="flex flex-wrap -mx-3">
										<div className="w-full px-3">
											<button
												onClick={(e) => signUpGoogle(e)}
												className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center"
											>
												<AiOutlineGoogle className="w-5 h-5 fill-current text-white opacity-75 flex-shrink-0 mx-4" />
												<span className="flex-auto pl-16 pr-8 -ml-16">
													Continue with Google
												</span>
											</button>
										</div>
									</div> */}
								</form>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default SignUp;
