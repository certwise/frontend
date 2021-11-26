import { Link } from "react-router-dom";
import Context from "../../store/context";
import OnboardingImage from "../../images/onboarding-image.jpg";
import OnboardingDecoration from "../../images/auth-decoration.png";
import { useState } from "react";
import { useContext } from "react";
import { organization, useCreate } from "../../api/organization";
import { Country, State, City } from "country-state-city";

function Onboarding2() {
	const create = useCreate();
	const countries = Country.getAllCountries();
	const { store } = useContext(Context);
	const [form, setform] = useState({
		name: "",
		email: "",
		country: "",
		state: "",
		city: "",
		postalCode: "",
		phone: "",
		address: "",
	});
	const createOrganization = async (e: any) => {
		e.preventDefault();
		const organization: organization = {
			name: form.name,
			createdBy: store.user.uid,
			createdAt: new Date(),
			customFields: [],
			lastUpdated: new Date(),
			metaData: {
				country: form.country,
				phone: form.phone,
				state: form.state,
				city: form.city,
				postalCode: form.postalCode,
				address: form.address,
			},
			email: form.email,
		};
		create.mutate(organization);
	};
	return (
		<main className="bg-white">
			<div className="relative flex">
				{/* Content */}
				<div className="w-full md:w-1/2">
					<div className="min-h-screen h-full flex flex-col after:flex-1">
						<div className="flex-1">
							{/* Header */}
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

							{/* Progress bar */}
							<div className="px-4 pt-12 pb-8">
								<div className="max-w-md mx-auto w-full">
									<div className="relative">
										<div
											className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-gray-200"
											aria-hidden="true"
										></div>
										<ul className="relative flex justify-between w-full">
											<li>
												<Link
													className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-blue-500 text-white"
													to="/onboard-organization"
												>
													1
												</Link>
											</li>

											<li>
												<Link
													className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-gray-100 text-gray-500"
													to="/onboard-organization-details"
												>
													2
												</Link>
											</li>
											<li>
												<Link
													className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-gray-100 text-gray-500"
													to="/onboard"
												>
													3
												</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						<div className="px-4 py-8">
							<div className="max-w-md mx-auto">
								<h1 className="text-3xl text-gray-800 font-bold mb-6">
									Organization information ✨
								</h1>
								{/* htmlForm */}
								<form>
									<div className="space-y-4 mb-8">
										{/* Name */}
										<div>
											<label
												className="block text-sm font-medium mb-1"
												htmlFor="company-name"
											>
												Organization Name{" "}
												<span className="text-red-500">*</span>
											</label>
											<input
												id="company-name"
												className="form-input w-full"
												type="text"
												onChange={(e) => {
													setform({ ...form, name: e.target.value });
												}}
											/>
										</div>
										{/* Email */}
										<div>
											<label
												className="block text-sm font-medium mb-1"
												htmlFor="street"
											>
												Organization Support email{" "}
												<span className="text-red-500">*</span>
											</label>
											<input
												id="street"
												className="form-input w-full"
												type="email"
												onChange={(e) =>
													setform({ ...form, email: e.target.value })
												}
											/>
										</div>
										{/* Country */}
										<div>
											<label
												className="block text-sm font-medium mb-1"
												htmlFor="country"
											>
												Country
											</label>
											<select
												onChange={(e) => {
													setform({ ...form, country: e.target.value });
												}}
												id="country"
												className="form-select w-full"
											>
												{countries.map((country) => (
													<option
														className="text-black"
														key={country.isoCode}
														value={country.isoCode}
													>
														{country.name}
													</option>
												))}
											</select>
										</div>
										{/* State */}
										{form.country &&
											State.getStatesOfCountry(form.country).length > 0 && (
												<div>
													<label
														className="block text-sm font-medium mb-1"
														htmlFor="State"
													>
														State
													</label>
													<select
														onChange={(e) =>
															setform({ ...form, state: e.target.value })
														}
														id="State"
														className="form-select w-full"
													>
														{State.getStatesOfCountry(form.country).map(
															(state) => (
																<option
																	className="text-black"
																	key={state.isoCode}
																	value={state.isoCode}
																>
																	{state.name}
																</option>
															)
														)}
													</select>
												</div>
											)}

										{/* City and Postal Code */}
										{form.state &&
											City.getCitiesOfState(form.country, form.state).length >
												0 && (
												<div className="flex space-x-4">
													<div className="flex-1">
														<label
															className="block text-sm font-medium mb-1"
															htmlFor="city"
														>
															City
														</label>
														<select
															onChange={(e) =>
																setform({ ...form, city: e.target.value })
															}
															id="city"
															className=" form-select w-full"
														>
															{City.getCitiesOfState(
																form.country,
																form.state
															).map((city) => (
																<option
																	className="text-black"
																	key={city.name}
																	value={city.name}
																>
																	{city.name}
																</option>
															))}
														</select>
													</div>
													<div className="flex-1">
														<label
															className="block text-sm font-medium mb-1"
															htmlFor="postal-code"
														>
															Postal Code
														</label>
														<input
															id="postal-code"
															className="form-input w-full"
															type="text"
															pattern="[0-9]{6}"
														/>
													</div>
												</div>
											)}
										{/* Street Address */}
										<div>
											<label
												className="block text-sm font-medium mb-1"
												htmlFor="street"
											>
												Street Address <span className="text-red-500">*</span>
											</label>
											<input
												id="street"
												className="form-input w-full"
												type="text"
											/>
										</div>
										{/* Phone Number */}
										<div>
											<label
												className="block text-sm font-medium mb-1"
												htmlFor="street"
											>
												Phone number <span className="text-red-500">*</span>
											</label>
											<input
												id="street"
												placeholder={
													"+" +
													Country.getCountryByCode(form.country)?.phonecode
												}
												className="form-input w-full"
												type="tel"
											/>
										</div>
									</div>
									<div className="flex items-center justify-between">
										<Link
											className="text-sm underline hover:no-underline"
											to="/onboard-organization"
										>
											&lt;- Back
										</Link>
										<button
											className="btn bg-blue-500 hover:bg-blue-600 text-white ml-auto"
											//to="/onboard"
											onClick={(e) => createOrganization(e)}
										>
											Next Step -&gt;
										</button>
									</div>
								</form>
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
						src={OnboardingImage}
						width="760"
						height="1024"
						alt="Onboarding"
					/>
					<img
						className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block"
						src={OnboardingDecoration}
						width="218"
						height="224"
						alt="Authentication decoration"
					/>
				</div>
			</div>
		</main>
	);
}

export default Onboarding2;
