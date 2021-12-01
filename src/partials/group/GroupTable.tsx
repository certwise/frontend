import { useState, useEffect, useContext } from "react";
import { focusHandling } from "cruip-js-toolkit";
import GroupTableItem from "./GroupTableItem";
import { useGet } from "../../api/organization";
import { Context } from "../../store";
import { useUpdate } from "../../api/group";
import { group, recipient } from "../../store/types";
import ModalBasic from "../../components/ui/ModalBasic";
import { useGetByGroup } from "../../api/recipient";

function GroupTable({ group }: { group: group }) {
	const { store } = useContext(Context);
	const [basicModalOpen, setBasicModalOpen] = useState<any>(false);
	const [customFieldName, setCustomFieldName] = useState("");
	const organization = useGet(store.user.organization);
	const customFields = organization.data?.data.customFields;
	const recipientQuery = useGetByGroup(group._id as string);
	const recipients = recipientQuery.data?.data;
	const editGroup = useUpdate();

	const addField = (e: any) => {
		e.preventDefault();
		if (group) {
			if (group.customFields) {
				const editedGroup: group = {
					...group,
					customFields: [...group.customFields, { name: customFieldName }],
				};
				editGroup.mutate(editedGroup);
			} else {
				const editedGroup = {
					...group,
					customFields: [{ name: customFieldName }],
				};
				editGroup.mutate(editedGroup);
			}
		}
		setBasicModalOpen(false);
		setCustomFieldName("");
	};

	return (
		<div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
			<header className="px-5 py-4">
				<h2 className="font-semibold text-gray-800">
					All Recipients in Group{" "}
					<span className="text-gray-400 font-medium">
						{recipients?.length || 0}
					</span>
				</h2>
			</header>
			<div>
				{/* Table */}
				<div className="overflow-x-auto">
					<table className="table-auto w-full">
						{/* Table header */}
						<thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-t border-b border-gray-200">
							<tr>
								<th className="pl-2 first:pl-5  py-3 whitespace-nowrap ">
									<div className="flex items-center">
										<label className="inline-flex">
											<span className="sr-only">Select all</span>
											<input
												className="form-checkbox"
												type="checkbox"
												// checked={selectAll}
												// onChange={handleSelectAll}
											/>
										</label>
									</div>
								</th>
								<th className="py-3 whitespace-nowrap ">
									<span className="sr-only">Favourite</span>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Name</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Email</div>
								</th>

								{customFields &&
									customFields.map((field: any) => (
										<th
											key={field.name}
											className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
										>
											<div className="font-semibold text-left">
												{field.name}
											</div>
										</th>
									))}
								{group.customFields &&
									group.customFields.map((field: any) => (
										<th
											key={field.name || "null"}
											className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
										>
											<div className="font-semibold text-left">
												{field.name || "null"}
											</div>
										</th>
									))}
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
									<button
										onClick={(e) => {
											e.stopPropagation();
											setBasicModalOpen(true);
										}}
										className="flex flex-row hover:text-blue-500"
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
							</tr>
						</thead>
						{/* Table body */}
						<tbody className="text-sm divide-y divide-gray-200">
							{group &&
								recipients?.map((recipient: recipient, i: number) => {
									return (
										<GroupTableItem
											key={i}
											group={group}
											recipient={recipient}
											customFields={customFields}
										/>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
			<ModalBasic
				id="basic-modal"
				modalOpen={basicModalOpen}
				setModalOpen={setBasicModalOpen}
				title="Add a custom Field"
			>
				{/* Modal content */}
				<div className="px-5 pt-4 pb-1">
					<div className="text-sm">
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
										onChange={(e) => setCustomFieldName(e.target.value)}
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
							onClick={(e) => addField(e)}
							className="btn-sm bg-blue-500 hover:bg-blue-600 text-white"
						>
							Add new field
						</button>
					</div>
				</div>
			</ModalBasic>
		</div>
	);
}

export default GroupTable;
