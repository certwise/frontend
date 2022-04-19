import { useContext, useState } from "react";
import { CustomField } from "../../store/types";
import * as recipientQuery from "../../api/recipient";
import ModalBasic from "../ui/ModalBasic";
import { recipient } from "../../store/types";
import { actions, Context } from "../../store";

function RecipientsTableItem({
	recipient,
	orgCustomFields,
}: {
	recipient: recipient;
	orgCustomFields: CustomField[];
}) {
	const { store, dispatch } = useContext(Context);
	const [basicModalOpen, setBasicModalOpen] = useState<any>(false);
	const editRecipient = recipientQuery.useUpdate();
	const [recipientFormData, setRecipientFormData] = useState({ ...recipient });

	const onChanged = (e: React.ChangeEvent<HTMLInputElement>, _id: string) => {
		const selected = store.recipients.selected.recipients;
		if (!selected.find((r) => r._id === _id) && !!e.target.checked) {
			const newSelected = [...selected];
			newSelected.push({ ...recipient });
			dispatch(actions.recipients.setSelectedRecipients(newSelected));
		}
		if (!!selected.find((r) => r._id === _id) && !e.target.checked) {
			const newSelected = [...selected];
			newSelected.splice(
				selected.findIndex((r) => r._id === _id),
				1
			);
			dispatch(actions.recipients.setSelectedRecipients(newSelected));
		}
	};
	const onEdit = () => {
		editRecipient.mutate(recipientFormData);
		setBasicModalOpen(false);
		setRecipientFormData({ ...recipient });
	};
	return (
		<tr>
			<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
				<div className="flex items-center">
					<label className="inline-flex">
						<span className="sr-only">Select</span>
						<input
							id={recipient._id}
							className="form-checkbox"
							type="checkbox"
							onChange={(e) => onChanged(e, recipient._id as string)}
							checked={
								!!store.recipients.selected.recipients.find(
									(r) => r._id === recipient._id
								)
							}
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
					<button
						onClick={(e) => {
							e.stopPropagation();
							setBasicModalOpen(true);
						}}
						className="font-medium text-blue-600 hover:text-blue-400"
					>
						{recipient.name}
					</button>
				</div>
			</td>
			<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
				<div className="text-left">{recipient.email}</div>
			</td>
			{orgCustomFields &&
				orgCustomFields.map((field) => (
					<td
						className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
						key={field.name}
					>
						<div className="font-semibold">
							{recipient.customFields.find((i) => i.name === field.name)
								?.value || " - "}
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
				<ModalBasic
					id="basic-modal"
					modalOpen={basicModalOpen}
					setModalOpen={setBasicModalOpen}
					title="Edit recipient"
				>
					{/* Modal content */}
					<div className="px-5 pt-4 pb-1">
						<div className="text-sm">
							<div className="space-y-2">
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

								{orgCustomFields &&
									orgCustomFields.map((field) => (
										<div key={field.name} className="my-6">
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
												placeholder={field.name}
												defaultValue={
													recipient.customFields.find(
														(i) => i.name === field.name
													)?.value
												}
												onChange={(e) => {
													const customFields = [...orgCustomFields];
													customFields.map((x) => {
														if (x.name === field.name) {
															x.value = e.target.value;
														}
														return x;
													});
													setRecipientFormData({
														...recipientFormData,
														customFields,
													});
												}}
											/>
										</div>
									))}
								{/* End */}
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
			</td>
		</tr>
	);
}

export default RecipientsTableItem;
