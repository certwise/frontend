import { useState, useEffect } from "react";
import { focusHandling } from "cruip-js-toolkit";
import Certificates from "./CertificateTableItem";
function CertificatesTable({ selectedItems, certificates }: any) {
	const [selectAll, setSelectAll] = useState<any>(false);
	const [isCheck, setIsCheck] = useState<any>([]);
	const [list, setList] = useState<any>([]);

	useEffect(() => {
		setList(certificates);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		focusHandling();
	}, [list]);

	const handleSelectAll = () => {
		setSelectAll(!selectAll);
		setIsCheck(list?.map((li: any) => li.id));
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
								<th className="px-5 mx-5 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
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
								<th className="pl-2 pr-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Credential</div>
								</th>

								<th className="pl-2 pr-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Status</div>
								</th>
								<th className="pl-2 pr-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Recipient</div>
								</th>
								<th className="pl-2 pr-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Last Updated</div>
								</th>
								<th className="pl-2 pr-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Created on</div>
								</th>
								<th className="pl-2 pr-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Template</div>
								</th>
								<th className="pl-2 pr-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Actions</div>
								</th>
							</tr>
						</thead>
						{/* Table body */}
						<tbody className="text-sm divide-y divide-gray-200">
							{certificates?.map((certificate: any) => {
								if (true)
									return (
										<Certificates
											key={certificate.id}
											certificate={certificate}
											handleClick={handleClick}
											isChecked={isCheck}
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
