import { Link, Redirect } from "react-router-dom";
import AuthImage from "../../images/auth-image.jpg";
import AuthDecoration from "../../images/auth-decoration.png";
import {
	getAuth,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	deleteUser,
} from "firebase/auth";
import { useState } from "react";
import { collection, deleteDoc, doc, getFirestore } from "firebase/firestore";
import axios from "axios";
import { env } from "../../config";
import { user } from "../../store/user/types";

function Signup() {
	const [redirect, setredirect] = useState(false);
	const [form, setForm] = useState({ email: "", password: "" });
	const auth = getAuth();
	const signUp = (e: any) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, form.email, form.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(error, errorCode, errorMessage);
				// ..
			});
	};
	const signUpGoogle = async (e: any) => {
		let result;
		e.preventDefault();
		try {
			const provider = new GoogleAuthProvider();
			const result_ = await signInWithPopup(auth, provider);
			result = result_;
			console.log("User created successfully", result.user);
			const user = result.user;
			let x: user = {
				uid: user.uid,
				name: user.displayName || "CertwiseDefaultUser",
				isVerified: false,
				createdAt: new Date(),

				email: user.email || "",
				organization: "",
				updatedAt: new Date(),
				numberOfTemplatesCreated: 0,
				numberOfCerificatesCreated: 0,
			};
			await axios.post(env.url + "/user", x);
			window.location.href = "/onboard-organization";
		} catch (e) {
			if (result) {
				await deleteUser(result.user);
			}
			const uDoc = doc(
				collection(getFirestore(), "users"),
				result?.user.uid.toString()
			);
			await deleteDoc(uDoc);
			alert("An error ocurred. Try again later...");
		}
	};
	return (
		<main className="bg-white">
			<div className="relative md:flex">
				{/* Content */}
				<div className="md:w-1/2">
					<div className="min-h-screen h-full flex flex-col after:flex-1">
						{/* Header */}
						<div className="flex-1">
							<div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
								{/* Logo */}
								<Link className="block" to="/">
									<svg width="32" height="32" viewBox="0 0 32 32">
										<defs>
											<linearGradient
												x1="28.538%"
												y1="20.229%"
												x2="100%"
												y2="108.156%"
												id="logo-a"
											>
												<stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
												<stop stopColor="#A5B4FC" offset="100%" />
											</linearGradient>
											<linearGradient
												x1="88.638%"
												y1="29.267%"
												x2="22.42%"
												y2="100%"
												id="logo-b"
											>
												<stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
												<stop stopColor="#38BDF8" offset="100%" />
											</linearGradient>
										</defs>
										<rect fill="#6366F1" width="32" height="32" rx="16" />
										<path
											d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
											fill="#4F46E5"
										/>
										<path
											d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
											fill="url(#logo-a)"
										/>
										<path
											d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
											fill="url(#logo-b)"
										/>
									</svg>
								</Link>
							</div>
						</div>

						<div className="max-w-sm mx-auto px-4 py-6">
							<h1 className="text-3xl text-gray-800 font-bold mb-6">
								Create your Account ✨
							</h1>
							{/* Form */}
							<form>
								<div className="space-y-4">
									<div>
										<label
											className="block text-sm font-medium mb-1"
											htmlFor="email"
										>
											Email Address <span className="text-red-500">*</span>
										</label>
										<input
											id="email"
											className="form-input w-full"
											type="email"
											onChange={(e) =>
												setForm({ ...form, email: e.target.value })
											}
										/>
									</div>
									<div>
										<label
											className="block text-sm font-medium mb-1"
											htmlFor="email"
										>
											Password <span className="text-red-500">*</span>
										</label>
										<input
											id="password"
											className="form-input w-full"
											type="password"
											autoComplete="on"
											onChange={(e) =>
												setForm({ ...form, password: e.target.value })
											}
										/>
									</div>
									<div>
										<label
											className="block text-sm font-medium mb-1"
											htmlFor="name"
										>
											Full Name <span className="text-red-500">*</span>
										</label>
										<input
											id="name"
											className="form-input w-full"
											type="text"
										/>
									</div>
									{/* <div>
										<label
											className="block text-sm font-medium mb-1"
											htmlFor="role"
										>
											Your Role <span className="text-red-500">*</span>
										</label>
										<select id="role" className="form-select w-full">
											<option>Designer</option>
											<option>Developer</option>
											<option>Accountant</option>
										</select>
									</div> */}
								</div>
								<div className="flex items-center justify-between mt-4">
									<div className="mr-1">
										<label className="flex items-center">
											<input type="checkbox" className="form-checkbox" />
											<span className="text-sm ml-2">
												Email me about product news.
											</span>
										</label>
									</div>
									{/* <Link
										className="btn bg-blue-500 hover:bg-blue-600 text-white ml-3 whitespace-nowrap"
										to="/onboard-organization"

									>
										Next
									</Link> */}
									<button
										className="btn bg-blue-500 hover:bg-blue-600 text-white ml-3 whitespace-nowrap"
										onClick={(e) => signUp(e)}
									>
										SignUp
									</button>
								</div>
								<button
									onClick={(e) => signUpGoogle(e)}
									className="btn font-medium text-white bg-blue-500 hover:bg-blue-600 flex p-2 mt-2 rounded-lg justify-center align-middle"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-brand-google"
										width="30"
										height="30"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#ffffff"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8" />
									</svg>
									<span className="align-middle ml-3 mt-1">
										Signin with google
									</span>
								</button>
							</form>
							{/* Footer */}
							<div className="pt-4 mt-6 border-t border-gray-200">
								<div className="text-sm">
									Have an account?{" "}
									<Link
										className="font-medium text-blue-500 hover:text-blue-600"
										to="/signin"
									>
										Sign In
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Image */}
				<div
					className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
					aria-hidden="true"
				>
					<img
						className="object-cover object-center w-full h-full"
						src={AuthImage}
						width="760"
						height="1024"
						alt="Authentication"
					/>
					<img
						className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block"
						src={AuthDecoration}
						width="218"
						height="224"
						alt="Authentication decoration"
					/>
				</div>
			</div>
		</main>
	);
}

export default Signup;
