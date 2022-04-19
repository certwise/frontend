import { useState, useContext, useEffect } from "react";
import { Context, actions } from "../../store";

import Image from "../../images/recipient.jpg";
import { useGet } from "../../api/organization";
import { user } from "../../store/types";
import { useUpdate } from "../../api/user";

function AccountPanel() {
	const { store, dispatch } = useContext(Context);
	useGet(store.user.organization);
	const [form, setform] = useState<user>(store.user);
	const update = useUpdate();
	useEffect(() => {
		if (update.isSuccess)
			dispatch(
				actions.toast.makeToast({
					message: "Account updated!",
					type: "success",
					duration: "short",
				})
			);
		if (update.isError)
			dispatch(
				actions.toast.makeToast({
					message: "There was an error please try later!",
					type: "error",
					duration: "short",
				})
			);
	}, [update.isSuccess, update.isError, dispatch]);
	return (
		<div className="flex-grow">
			{/* Panel body */}
			<div className="p-6 space-y-6">
				<h2 className="text-2xl text-gray-800 font-bold mb-5">My Account</h2>
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
						Your Profile
					</h2>
					<div className="text-sm">
						Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
						officia deserunt mollit.
					</div>
					<div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
						<div className="sm:w-1/2">
							<label className="block text-sm font-medium mb-1" htmlFor="name">
								Name
							</label>
							<input
								id="name"
								defaultValue={form.name}
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
								id="location"
								placeholder="Your phone number"
								defaultValue={form.phoneNumber}
								className="form-input w-full"
								type="text"
								onChange={(e) =>
									setform({ ...form, phoneNumber: e.target.value })
								}
							/>
						</div>
					</div>
				</section>
				{/* Email */}
				<section>
					<h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">
						Email
					</h2>
					<div className="text-sm">
						Excepteur sint occaecat cupidatat non proident sunt in culpa qui
						officia.
					</div>
					<div className="flex flex-wrap mt-5">
						<div className="mr-2">
							<label className="sr-only" htmlFor="email">
								Email
							</label>
							<input
								defaultValue={form.email}
								id="email"
								className="form-input"
								type="email"
								placeholder="email"
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
						Password
					</h2>
					<div className="text-sm">
						You cannot set a password if you have signed up using Google sign
						in.
					</div>
					<div className="mt-5">
						<button className="btn border-gray-200 shadow-sm text-blue-500">
							Set New Password
						</button>
					</div>
				</section>
				{/* Smart Sync */}
				<section>
					<h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">
						Your Organization
					</h2>
					<div className="font-bold text-blue-500">
						{store.organization.name}
					</div>
					<div className="text-sm">
						You are the administrator of this organization.
					</div>
					<div className="mt-5">
						<button className="btn border-gray-200 shadow-sm text-blue-500">
							Organization Profile
						</button>
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

export default AccountPanel;
