import { useState, useEffect, useContext } from "react";
import { focusHandling } from "cruip-js-toolkit";
import Customer from "./GroupTableItem";
import { useGetInstitution } from "../../api/recipientQueries";
import Context from "../../store/context";
function GroupTable({ selectedItems, recipients }: any) {
	const { store } = useContext(Context);
	const [selectAll, setSelectAll] = useState<any>(false);
	const [isCheck, setIsCheck] = useState<any>([]);
	const institute = useGetInstitution(store.user.institution);

	const list = recipients;

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
							<tr>
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
								{institute.data?.data.customFields &&
									institute.data?.data.customFields.map((field: any) => (
										<div
											key={field.name}
											className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
										>
											<div className="font-semibold">{field.name}</div>
										</div>
									))}
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold">...</div>
								</th>
							</tr>
						</thead>
						{/* Table body */}
						<tbody className="text-sm divide-y divide-gray-200">
							{list.map((customer: any) => {
								return <Customer key={customer} id={customer} />;
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default GroupTable;
