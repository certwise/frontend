import { useContext, useEffect, useState } from "react";
import { actions, Context } from "../../store";
import { Country, State } from "country-state-city";
import Image from "../../images/org.jpg";
import { useGet, useUpdate } from "../../api/organization";
import { organization } from "../../store/types";
import { Link } from "react-router-dom";
import { duration } from "moment";

function OrganizationPanel() {
	const { store, dispatch } = useContext(Context);
	const organizationQuery = useGet(store.user.organization);
	const country = Country.getCountryByCode(
		store.organization.metaData?.country || ""
	);
	const update = useUpdate();
	const state = State.getStateByCode(store.organization.metaData?.state || "");
	const [form, setform] = useState<organization>(store.organization);
	useEffect(() => {
		setform(organizationQuery.data?.data);
	}, [organizationQuery.data]);

	useEffect(() => {
		if (update.isSuccess)
			dispatch(
				actions.toast.makeToast({
					message: "Organization updated!",
					type: "success",
					duration: "short",
				})
			);
		if (update.isError)
			dispatch(
				actions.toast.makeToast({
					message: "An error occured please try again later..",
					type: "error",
					duration: "short",
				})
			);
	}, [update.isSuccess, update.isError]);
	return (
		<div className="flex-grow">
			{/* Panel body */}

			<div className="p-6 space-y-6">
				<h2 className="text-2xl text-gray-800 font-bold mb-5">
					My Organization
				</h2>
				{/* Picture */}
				<section>
					<div className="flex items-center">
						<div className="mr-4">
							<img
								className="w-20 h-20 rounded-full"
								src={Image}
								width="80"
								height="80"
								alt="User upload"
							/>
						</div>
						<button className="btn-sm bg-blue-500 hover:bg-blue-600 text-white">
							Change
						</button>
					</div>
				</section>
				{/* Business Profile */}
				<section>
					<h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">
						Profile
					</h2>
					<div className="text-sm">
						Your organization name and contact details. Please give the full
						legal name of your organization.
					</div>
					<div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
						<div className="sm:w-1/2">
							<label className="block text-sm font-medium mb-1" htmlFor="name">
								Name
							</label>
							<input
								id="name"
								value={form?.name}
								className="form-input w-full"
								type="text"
								onChange={(e) => setform({ ...form, name: e.target.value })}
							/>
						</div>

						<div className="sm:w-1/2">
							<label
								className="block text-sm font-medium mb-1"
								htmlFor="location"
							>
								Phone
							</label>
							<input
								id="phone"
								placeholder="Organization phone number"
								value={form?.metaData?.phone}
								className="form-input w-full"
								type="text"
								onChange={(e) =>
									setform({
										...form,
										metaData: { ...form?.metaData, phone: e.target.value },
									})
								}
							/>
						</div>
					</div>
				</section>
				<section className="mt-4">
					<h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">
						About
					</h2>
					<label className="block text-sm mb-1 " htmlFor="about">
						A brief description of your organization. This will be displayed
						when users view any certificate from your organization.
					</label>
					<textarea
						id="about"
						placeholder="About"
						value={form?.metaData?.description}
						className="form-input w-full"
					/>
				</section>
				<section>
					<h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">
						Business Address
					</h2>
					<div className="text-sm">
						Your organization's address. Please fill all the fields.
					</div>
					<div className="flex flex-col space-y-4 mt-5">
						<div>
							<label
								className="block text-sm font-medium mb-1"
								htmlFor="address"
							>
								Address
							</label>
							<textarea
								id="address"
								value={form?.metaData?.address}
								className="form-input max-w-xl"
								onChange={(e) =>
									setform({
										...form,
										metaData: { ...form?.metaData, address: e.target.value },
									})
								}
							/>
						</div>
						<div className="flex flex-row space-x-3">
							<div>
								<label
									className="block text-sm font-medium mb-1"
									htmlFor="country"
								>
									Country
								</label>
								<input
									id="country"
									value={country?.name}
									className="form-input w-full"
									type="text"
									onChange={(e) =>
										setform({
											...form,
											metaData: { ...form?.metaData, country: e.target.value },
										})
									}
								/>
							</div>
							<div>
								<label
									className="block text-sm font-medium mb-1"
									htmlFor="state"
								>
									State
								</label>
								<input
									id="state"
									value={state?.name}
									className="form-input w-full"
									type="text"
									onChange={(e) =>
										setform({
											...form,
											metaData: { ...form?.metaData, state: e.target.value },
										})
									}
								/>
							</div>
						</div>
						<div className="flex flex-row space-x-3">
							<div>
								<label
									className="block text-sm font-medium mb-1"
									htmlFor="city"
								>
									City
								</label>
								<input
									id="city"
									value={form?.metaData?.city}
									className="form-input w-full"
									type="text"
									onChange={(e) =>
										setform({
											...form,
											metaData: { ...form?.metaData, city: e.target.value },
										})
									}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1" htmlFor="zip">
									Postal / Zip code
								</label>
								<input
									id="zip"
									value={form?.metaData?.postalCode}
									className="form-input w-full"
									type="text"
									onChange={(e) =>
										setform({
											...form,
											metaData: {
												...form?.metaData,
												postalCode: e.target.value,
											},
										})
									}
								/>
							</div>
						</div>
					</div>
				</section>
				{/* Email */}
				<section>
					<h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">
						Support email
					</h2>
					<div className="text-sm">
						Your organization's support email. This will be used by users and
						Certwise to contact you incase of any discrepencies.
					</div>
					<div className="flex flex-wrap mt-5">
						<div className="mr-2">
							<label className="sr-only" htmlFor="semail">
								Support Email
							</label>
							<input
								value={form?.email}
								id="semail"
								className="form-input"
								type="email"
								onChange={(e) => setform({ ...form, email: e.target.value })}
							/>
						</div>
						<button className="btn border-gray-200 hover:border-gray-300 shadow-sm text-blue-500">
							Change
						</button>
					</div>
				</section>
				{/* Password */}
				<section>
					<h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">
						Administrator
					</h2>
					<div className="text-sm font-bold text-blue-500">
						{store.user.name}
					</div>
					<div className="text-sm">Organization creator and administrator.</div>
					<div className="mt-5">
						<Link
							to="/account"
							className="btn border-gray-200 shadow-sm text-blue-500"
						>
							Go to profile
						</Link>
					</div>
				</section>
			</div>
			{/* Panel footer */}
			<footer>
				<div className="flex flex-col px-6 py-5 border-t border-gray-200">
					<div className="flex self-end">
						<button className="btn border-gray-200 hover:border-gray-300 text-gray-600">
							Cancel
						</button>
						<button
							onClick={() => {
								update.mutate(form);
							}}
							className="btn bg-blue-500 hover:bg-blue-600 text-white ml-3"
						>
							Save Changes
						</button>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default OrganizationPanel;
