import { useState, useEffect } from "react";
import { focusHandling } from "cruip-js-toolkit";
import Customer from "./RecipientTableItem";
import ModalBasic from "../../components/ui/ModalBasic";

function CustomersTable({ selectedItems, recipients }: any) {
	const [selectAll, setSelectAll] = useState<any>(false);
	const [isCheck, setIsCheck] = useState<any>([]);
	const [basicModalOpen, setBasicModalOpen] = useState<any>(false);
	const [customField, setcustomField] = useState("");
	console.log("1920 list", recipients);
	const list = recipients;
	const setCustomFields = () => {};
	useEffect(() => {
		focusHandling();
	}, [list]);

	const handleSelectAll = () => {
		setSelectAll(!selectAll);
		setIsCheck(list.map((li: any) => li.id));
		if (selectAll) {
			setIsCheck([]);
		}
	};

	const handleClick = (e: any) => {
		const { id, checked } = e.target;
		setSelectAll(false);
		setIsCheck([...isCheck, id]);
		if (!checked) {
			setIsCheck(isCheck.filter((item: any) => item !== id));
		}
	};

	useEffect(() => {
		selectedItems(isCheck);
	}, [isCheck]);

	return (
		<div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
			<header className="px-5 py-4">
				<h2 className="font-semibold text-gray-800">
					All Recipients{" "}
					<span className="text-gray-400 font-medium">{list.length || 0}</span>
				</h2>
			</header>
			<div>
				{/* Table */}
				<div className="overflow-x-auto">
					<table className="table-auto w-full">
						{/* Table header */}
						<thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-t border-b border-gray-200">
							<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
								<div className="flex items-center">
									<label className="inline-flex">
										<span className="sr-only">Select all</span>
										<input
											className="form-checkbox"
											type="checkbox"
											checked={selectAll}
											onChange={handleSelectAll}
										/>
									</label>
								</div>
							</th>
							<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
								<span className="sr-only">Favourite</span>
							</th>
							<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
								<div className="font-semibold text-left">Name</div>
							</th>
							<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
								<div className="font-semibold text-left">Email</div>
							</th>
							<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
								<div className="font-semibold">No. of certificates</div>
							</th>
							{}
							<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
								<button
									onClick={() => {
										alert("SetCustomFields");
									}}
									className="flex flex-row hover:text-indigo-500"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-new-section"
										width="28"
										height="28"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#2c3e50"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<line x1="9" y1="12" x2="15" y2="12" />
										<line x1="12" y1="9" x2="12" y2="15" />
										<path d="M4 6v-1a1 1 0 0 1 1 -1h1m5 0h2m5 0h1a1 1 0 0 1 1 1v1m0 5v2m0 5v1a1 1 0 0 1 -1 1h-1m-5 0h-2m-5 0h-1a1 1 0 0 1 -1 -1v-1m0 -5v-2m0 -5" />
									</svg>
									<span className="ml-1 mt-1">New field</span>
								</button>
							</th>
						</thead>
						{/* Table body */}
						<tbody className="text-sm divide-y divide-gray-200">
							{list.map((customer: any) => {
								console.log("1920 Cus", customer);
								return <Customer key={customer} id={customer} />;
							})}
						</tbody>
					</table>
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
											Field Name
										</label>
										<input
											id="default"
											className="form-input w-full"
											type="text"
											onChange={(e) => setcustomField(e.target.value)}
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
								onClick={() => setCustomFields()}
								className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
							>
								Create New Recipient
							</button>
						</div>
					</div>
				</ModalBasic>
			</div>
		</div>
	);
}

export default CustomersTable;
