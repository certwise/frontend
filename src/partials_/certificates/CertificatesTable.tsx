import React, { useState, useEffect } from "react";
import { focusHandling } from "cruip-js-toolkit";
import Invoices from "./CertificateTableItem";

function CertificatesTable({ selectedItems }: any) {
	const invoices = [
		{
			id: "0",
			invoice: "#123567",
			total: "$129.00",
			status: "Revoked",
			customer: "Dominik Lamakani",
			issueddate: "22/07/2021",
			paiddate: "-",
			type: "CSE Internship template",
		},
		{
			id: "1",
			invoice: "#779912",
			total: "$59.00",
			status: "Issued",
			customer: "Mark Cameron",
			issueddate: "19/07/2021",
			paiddate: "20/07/2021",
			type: "CSE Internship template",
		},
		{
			id: "2",
			invoice: "#889924",
			total: "$89.00",
			status: "Issued",
			customer: "Sergio Gonnelli",
			issueddate: "17/07/2021",
			paiddate: "19/07/2021",
			type: "Google Intern",
		},
		{
			id: "3",
			invoice: "#897726",
			total: "$129.00",
			status: "Created",
			customer: "Manuel Garbaya",
			issueddate: "04/07/2021",
			paiddate: "-",
			type: "CSE Internship template",
		},
		{
			id: "4",
			invoice: "#123567",
			total: "$129.00",
			status: "Created",
			customer: "Cool Robot",
			issueddate: "04/07/2021",
			paiddate: "-",
			type: "CSE Internship template",
		},
		{
			id: "5",
			invoice: "#896644",
			total: "$129.00",
			status: "Issued",
			customer: "Mark Cameron",
			issueddate: "04/07/2021",
			paiddate: "09/07/2021",
			type: "Google Intern",
		},
		{
			id: "6",
			invoice: "#136988",
			total: "$69.00",
			status: "Issued",
			customer: "Glenn Thomas",
			issueddate: "01/07/2021",
			paiddate: "01/07/2021",
			type: "Google Intern",
		},
		{
			id: "7",
			invoice: "#442206",
			total: "$129.00",
			status: "Revoked",
			customer: "Dominik Lamakani",
			issueddate: "22/06/2021",
			paiddate: "-",
			type: "CSE Internship template",
		},
		{
			id: "8",
			invoice: "#764321",
			total: "$89.00",
			status: "Issued",
			customer: "Brian Halligan",
			issueddate: "21/06/2021",
			paiddate: "29/06/2021",
			type: "Google Intern",
		},
		{
			id: "9",
			invoice: "#908764",
			total: "$129.00",
			status: "Created",
			customer: "Carolyn McNeail",
			issueddate: "17/06/2021",
			paiddate: "-",
			type: "CSE Internship template",
		},
	];

	const [selectAll, setSelectAll] = useState<any>(false);
	const [isCheck, setIsCheck] = useState<any>([]);
	const [list, setList] = useState<any>([]);

	useEffect(() => {
		setList(invoices);
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
					Certificates <span className="text-gray-400 font-medium">67</span>
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
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Credential</div>
								</th>

								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Status</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Recipient</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Issued on</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Created on</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Template</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Actions</div>
								</th>
							</tr>
						</thead>
						{/* Table body */}
						<tbody className="text-sm divide-y divide-gray-200">
							{list.map((invoice: any) => {
								return (
									<Invoices
										key={invoice.id}
										id={invoice.id}
										invoice={invoice.invoice}
										total={invoice.total}
										status={invoice.status}
										customer={invoice.customer}
										issueddate={invoice.issueddate}
										paiddate={invoice.paiddate}
										type={invoice.type}
										handleClick={handleClick}
										isChecked={isCheck.includes(invoice.id)}
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

export default CertificatesTable;
