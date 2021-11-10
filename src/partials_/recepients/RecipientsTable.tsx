import { useState, useEffect } from "react";
import { focusHandling } from "cruip-js-toolkit";
import Customer from "./RecipientTableItem";

function CustomersTable({ selectedItems }: any) {
	const [selectAll, setSelectAll] = useState<any>(false);
	const [isCheck, setIsCheck] = useState<any>([]);
	const [list, setList] = useState<any>([]);

	useEffect(() => {
		setList([]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
					All Recipients <span className="text-gray-400 font-medium">248</span>
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
									<div className="font-semibold text-left">Roll Number</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold">No. of certificates</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">
										Last certificate
									</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">DOB</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold">Refunds</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<span className="sr-only">Menu</span>
								</th>
							</tr>
						</thead>
						{/* Table body */}
						<tbody className="text-sm divide-y divide-gray-200">
							{list.map((customer: any) => {
								return (
									<Customer
										key={customer.id}
										id={customer.id}
										image={customer.image}
										name={customer.name}
										email={customer.email}
										location={customer.location}
										orders={customer.orders}
										lastOrder={customer.lastOrder}
										spent={customer.spent}
										refunds={customer.refunds}
										fav={customer.fav}
										handleClick={handleClick}
										isChecked={isCheck.includes(customer.id)}
									/>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default CustomersTable;
