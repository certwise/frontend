import { useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import DeleteButton from "../../partials/actions/DeleteButton";
import DateSelect from "../../components/ui/DateSelect";
import FilterButton from "../../components/ui/DropdownFilter";
import RecipientsTable from "../../partials_/recepients/RecipientsTable";
import PaginationClassic from "../../components/ui/PaginationClassic";
import ModalBasic from "../../components/ui/ModalBasic";

function Recipients() {
	const [sidebarOpen, setSidebarOpen] = useState<any>(false);
	const [selectedItems, setSelectedItems] = useState<any>([]);
	const [basicModalOpen, setBasicModalOpen] = useState<any>(false);
	const [recipientDetails, setRecipientDetails] = useState({
		name: "",
		email: "",
		uniqueId: "",
	});
	const handleSelectedItems = (selectedItems: any) => {
		setSelectedItems([...selectedItems]);
	};
	const createNewRecipient = () => {
		console.log(recipientDetails);
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
								<DeleteButton selectedItems={selectedItems} />
								{/* Dropdown */}
								<DateSelect />
								{/* Filter button */}
								<FilterButton align="right" />
								{/* Add customer button */}
								<button
									onClick={(e) => {
										e.stopPropagation();
										setBasicModalOpen(true);
									}}
									className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
								>
									<svg
										className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
										viewBox="0 0 16 16"
									>
										<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
									</svg>
									<span className="hidden xs:block ml-2">Add Recipient</span>
								</button>
							</div>
						</div>
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
													onChange={(e) =>
														setRecipientDetails({
															...recipientDetails,
															email: e.target.value,
														})
													}
												/>
											</div>
											<div className="my-6">
												<label
													className="block text-sm font-medium mb-1"
													htmlFor="default"
												>
													Recipient Roll no. / unique ID
												</label>
												<input
													id="default"
													className="form-input w-full"
													type="text"
													onChange={(e) =>
														setRecipientDetails({
															...recipientDetails,
															uniqueId: e.target.value,
														})
													}
												/>
											</div>
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
										onClick={() => createNewRecipient()}
										className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
									>
										Create New Recipient
									</button>
								</div>
							</div>
						</ModalBasic>

						{/* Table */}
						<RecipientsTable selectedItems={handleSelectedItems} />

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
