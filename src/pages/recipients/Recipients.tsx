import { useEffect, useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import DeleteButton from "../../partials/actions/DeleteButton";
import DateSelect from "../../components/ui/DateSelect";
import FilterButton from "../../partials/recepients/DropdownFilter";
import RecipientsTable from "../../partials/recepients/RecipientsTable";
import PaginationClassic from "../../components/ui/PaginationClassic";
import ModalBasic from "../../components/ui/ModalBasic";
import { CustomField, group, recipient } from "../../store/types";
import { actions, Context } from "../../store";
import { useContext } from "react";
import GroupSelector from "../../partials/recepients/DropdownClassic";
import ModalBlank from "../../components/ui/ModalBlank";
import * as groupQuery from "../../api/group";
import * as recipientQuery from "../../api/recipient";
import { useGet } from "../../api/organization";

function Recipients() {
	const { store, dispatch } = useContext(Context);
	const [sidebarOpen, setSidebarOpen] = useState<any>(false);
	const [basicModalOpen, setBasicModalOpen] = useState<any>(false);
	const [groupModalOpen, setGroupModalOpen] = useState<any>(false);
	const [selectedGroup, setSelectedGroup] = useState<group>();
	const organizationQuery = useGet(store.user.organization);
	const organizationCustomFields: CustomField[] =
		organizationQuery.data?.data.customFields || [];
	const createRecipient = recipientQuery.useCreate();
	const updateRecipient = recipientQuery.useUpdate();
	const bulkCreate = recipientQuery.useCreateBulk();
	const groups = groupQuery.useGetByOrganization(store.user.organization);
	const [recipientDetails, setRecipientDetails] = useState<{
		name: string;
		email: string;
		customFields: CustomField[];
	}>({
		name: "",
		email: "",
		customFields: [],
	});
	const recipients = recipientQuery.useGetByOrganization(
		store.user.organization
	);
	const [filterOption, setFilterOption] =
		useState<{ name: string; option?: any }>();
	const addSelectedRecipientsToGroup = () => {
		if (
			selectedGroup !== null &&
			store.recipients.selected.recipients.length > 0
		) {
			for (const recipient of store.recipients.selected.recipients) {
				if (!recipient.groups) {
					updateRecipient.mutate({
						...recipient,
						groups: [selectedGroup?._id as string],
					});
				} else if (
					recipient.groups &&
					!recipient.groups.includes(selectedGroup?._id as string)
				) {
					updateRecipient.mutate({
						...recipient,
						groups: [...recipient.groups, selectedGroup?._id as string],
					});
				} else {
					dispatch(
						actions.toast.makeToast({
							message:
								"Recipient " +
								recipient.email +
								" already exists in this group",
							type: "warning",
							duration: "short",
						})
					);
				}
			}
			setGroupModalOpen(false);
		}
	};
	useEffect(() => {
		if (createRecipient.isSuccess) {
			setBasicModalOpen(false);
			createRecipient.reset();
		}
	}, [createRecipient.isSuccess]);

	useEffect(() => {
		if (updateRecipient.isSuccess) {
			setGroupModalOpen(false);
			updateRecipient.reset();
		}
		if (bulkCreate.isSuccess) {
			setGroupModalOpen(false);
			bulkCreate.reset();
		}
	}, [updateRecipient.isSuccess, bulkCreate.isSuccess]);

	const createNewRecipient = async () => {
		const recipient: recipient = {
			email: recipientDetails.email,
			name: recipientDetails.name,
			createdAt: new Date(),
			customFields: recipientDetails.customFields.map((field) => {
				return {
					name: field.name,
					value: "",
				};
			}),
			organization: store.user.organization,
			groups: [],
			certificates: [],
		};
		await createRecipient.mutateAsync(recipient);
		setRecipientDetails({ name: "", email: "", customFields: [] });
	};

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar */}
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				{/*  Site header */}
				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<main>
					<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
						{/* Page header */}
						<div className="sm:flex sm:justify-between sm:items-center mb-8">
							{/* Left: Title */}
							<div className="mb-4 sm:mb-0">
								<h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
									Recipients ✨
								</h1>
							</div>

							{/* Right: Actions */}
							<div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
								{/* Delete button */}
								<DeleteButton
									selectedItems={
										store.recipients.selected.recipients.map((x) => x._id) || [
											"",
										]
									}
								/>
								{/* Filter button */}
								<FilterButton
									align="right"
									options={[
										{ name: "Name" },
										{ name: "Email" },
										...organizationCustomFields,
									]}
									setOption={setFilterOption}
								/>
								{/* Add customer button */}
								<button
									onClick={(e) => {
										e.stopPropagation();
										setBasicModalOpen(true);
									}}
									className="btn bg-blue-500 hover:bg-blue-600 text-white"
								>
									<svg
										className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
										viewBox="0 0 16 16"
									>
										<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
									</svg>
									<span className="hidden xs:block ml-2">Add Recipient</span>
								</button>
								{/* <button
									onClick={(e) => {
										e.stopPropagation();
										addRandomRecipients(1000);
									}}
									className="btn bg-blue-500 hover:bg-blue-600 text-white"
								>
									<svg
										className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
										viewBox="0 0 16 16"
									>
										<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
									</svg>
									<span className="hidden xs:block ml-2">
										Add 1000 Recipients
									</span>
								</button> */}
							</div>
						</div>
						{store.recipients.selected.recipients.length > 0 && (
							<div className="flex flex-row">
								<button
									onClick={(e) => {
										e.stopPropagation();
										setGroupModalOpen(true);
									}}
									className="btn bg-white text-blue-500 hover:bg-blue-500 hover:text-white border border-blue-500 mb-3"
								>
									Add Selected to Group
								</button>

								{groups.data && (
									<div style={{ width: "250px" }} className="ml-3 ">
										<GroupSelector
											onSelect={(group: group) => {
												setSelectedGroup(group);
											}}
											options={groups.data?.data}
										/>
									</div>
								)}
							</div>
						)}

						<ModalBasic
							id="basic-modal"
							modalOpen={basicModalOpen}
							setModalOpen={setBasicModalOpen}
							title="Add recipient"
						>
							{/* Modal content */}
							<div className="px-5 pt-4 pb-1">
								<div className="text-sm">
									{/* <div className="font-medium text-gray-800 mb-2">
										Add a new recipient:
									</div> */}
									<div className="space-y-2">
										<form
											onSubmit={(e) => {
												e.preventDefault();
												createNewRecipient();
											}}
										>
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
													placeholder="Enter recipient name"
													value={recipientDetails.name || ""}
													onChange={(e) =>
														setRecipientDetails({
															...recipientDetails,
															name: e.target.value,
														})
													}
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
													placeholder="Enter recipient email"
													value={recipientDetails.email || ""}
													onChange={(e) =>
														setRecipientDetails({
															...recipientDetails,
															email: e.target.value,
														})
													}
												/>
											</div>
											{organizationCustomFields &&
												organizationCustomFields.map((field) => (
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
															onChange={(e) => {
																const customFields = [
																	...organizationCustomFields,
																];
																customFields.map((x) => {
																	if (x.name === field.name) {
																		x.value = e.target.value;
																	}
																	return x;
																});
																setRecipientDetails({
																	...recipientDetails,
																	customFields,
																});
															}}
														/>
													</div>
												))}

											<input type="submit" className="invisible w-0 h-0" />
											{/* End */}
										</form>
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
										onClick={() => createNewRecipient()}
										className="btn-sm bg-blue-500 hover:bg-blue-600 text-white"
									>
										Create New Recipient
									</button>
								</div>
							</div>
						</ModalBasic>

						<ModalBlank
							id="group"
							modalOpen={groupModalOpen}
							setModalOpen={setGroupModalOpen}
							title="Add Selected users to group"
						>
							{/* Modal content */}
							<div className="px-5 pt-4 pb-1">
								Do you want to add {store.recipients.selected.recipients.length}{" "}
								users to
								{" " + selectedGroup?.name} group?
							</div>
							{/* Modal footer */}
							<div className="px-5 py-4">
								<div className="flex flex-wrap justify-end space-x-2">
									<button
										className="btn-sm border-gray-200 hover:border-gray-300 text-gray-600"
										onClick={(e) => {
											e.stopPropagation();
											setGroupModalOpen(false);
										}}
									>
										Cancel
									</button>
									<button
										onClick={() => addSelectedRecipientsToGroup()}
										className="btn-sm bg-blue-500 hover:bg-blue-600 text-white"
									>
										Yes
									</button>
								</div>
							</div>
						</ModalBlank>

						{/* Table */}
						{!recipients.isLoading ? (
							<RecipientsTable recipients={recipients.data?.data} />
						) : (
							<div>Loading...</div>
						)}

						{/* Pagination */}
						<div className="mt-8">
							<PaginationClassic />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default Recipients;
