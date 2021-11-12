import { useContext, useState } from "react";
import { useEditRecipient, useGetRecipient } from "../../api/recipientQueries";
import ModalBasic from "../../components/ui/ModalBasic";
import Context from "../../store/context";

function CustomersTableItem({
	id,
	customFields,
}: {
	id: string;
	customFields: any;
}) {
	const { store, dispatch } = useContext(Context);
	const [basicModalOpen, setBasicModalOpen] = useState<any>(false);
	const editRecipient = useEditRecipient();
	const { data, isFetching } = useGetRecipient(id);
	const recipient = data?.data || {};
	const [recipientFormData, setRecipientFormData] = useState({ ...recipient });
	const onChanged = (e: any, id: string) => {
		console.log(e.target.checked, id, store.recipients);
		const x = [...store.recipients.selected];
		if (!x.includes(id)) {
			x.push(id);
		} else {
			x.splice(x.indexOf(id), 1);
		}
		dispatch({ type: "SET_SELECTED_RECIPIENTS", payload: x });
	};
	const onEdit = () => {
		editRecipient.mutate(recipientFormData);
		setBasicModalOpen(false);
	};
	return (
		<>
			<tr>
				<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
					<div className="flex items-center">
						<label className="inline-flex">
							<span className="sr-only">Select</span>
							<input
								id={id}
								className="form-checkbox"
								type="checkbox"
								onChange={(e) => onChanged(e, id)}
								checked={store.recipients.selected.includes(id)}
							/>
						</label>
					</div>
				</td>
				<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
					<div className="flex items-center relative">
						<button>
							<svg
								className={`w-4 h-4 flex-shrink-0 fill-current ${
									true ? "text-yellow-500" : "text-gray-300"
								}`}
								viewBox="0 0 16 16"
							>
								<path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
							</svg>
						</button>
					</div>
				</td>
				<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
					<div className="flex items-center">
						{/* <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
						<img
							className="rounded-full"
							src={props.image}
							width="40"
							height="40"
							alt={props.name}
						/>
					</div> */}
						<div className="font-medium text-gray-800">
							{!isFetching ? (
								recipient.name
							) : (
								<div className="flex justify-center items-center">
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 text-xl "></div>
								</div>
							)}
						</div>
					</div>
				</td>
				<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
					<div className="text-left">{recipient.email}</div>
				</td>
				{customFields &&
					customFields.map((field: any) => (
						<td
							className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
							key={field.name}
						>
							<div className="font-semibold">
								{data?.data[field.name] || " - "}
							</div>
						</td>
					))}
				<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
					<button
						onClick={(e) => {
							e.stopPropagation();
							setBasicModalOpen(true);
						}}
						className="text-gray-400 hover:text-gray-500 rounded-full"
					>
						<span className="sr-only">Menu</span>
						<svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
							<circle cx="16" cy="16" r="2" />
							<circle cx="10" cy="16" r="2" />
							<circle cx="22" cy="16" r="2" />
						</svg>
					</button>
				</td>
			</tr>
			<ModalBasic
				id="basic-modal"
				modalOpen={basicModalOpen}
				setModalOpen={setBasicModalOpen}
				title="Edit recipient"
			>
				{/* Modal content */}
				<div className="px-5 pt-4 pb-1">
					<div className="text-sm">
						{/* <div className="font-medium text-gray-800 mb-2">
										Add a new recipient:
									</div> */}
						<div className="space-y-2">
							<div>
								{/* Start */}
								<div className="my-6">
									<label
										className="block text-sm font-medium mb-1"
										htmlFor="default"
									>
										Recipient Name
									</label>
									<input
										id="default"
										className="form-input w-full"
										type="text"
										value={recipientFormData.name}
										onChange={(e) => {
											setRecipientFormData({
												...recipientFormData,
												name: e.target.value,
											});
										}}
									/>
								</div>
								<div className="my-6">
									<label
										className="block text-sm font-medium mb-1"
										htmlFor="default"
									>
										Recipient Email
									</label>
									<input
										id="default"
										className="form-input w-full"
										type="text"
										value={recipientFormData.email}
										onChange={(e) => {
											setRecipientFormData({
												...recipientFormData,
												email: e.target.value,
											});
										}}
									/>
								</div>

								{customFields &&
									customFields.map((field: any) => (
										<div className="my-6">
											<label
												className="block text-sm font-medium mb-1"
												htmlFor="default"
											>
												{field.name}
											</label>
											<input
												id="default"
												className="form-input w-full"
												type="text"
												value={recipientFormData[field.name] || "NA"}
												onChange={(e) => {
													setRecipientFormData({
														...recipientFormData,
														[field.name]: e.target.value,
													});
												}}
											/>
										</div>
									))}
								{/* End */}
							</div>
						</div>
					</div>
				</div>
				{/* Modal footer */}
				<div className="px-5 py-4">
					<div className="flex flex-wrap justify-end space-x-2">
						<button
							className="btn-sm border-gray-200 hover:border-gray-300 text-gray-600"
							onClick={(e) => {
								e.stopPropagation();
								setBasicModalOpen(false);
							}}
						>
							Cancel
						</button>
						<button
							onClick={() => onEdit()}
							className="btn-sm bg-blue-500 hover:bg-blue-600 text-white"
						>
							Save changes to Recipient
						</button>
					</div>
				</div>
			</ModalBasic>
		</>
	);
}

export default CustomersTableItem;
