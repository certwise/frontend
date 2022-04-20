import { useState } from "react";

function CSVTable({ columns, data }: { columns: string[]; data: Array<any> }) {
	const [togglePreview, setTogglePreview] = useState(false);
	return (
		<>
			<div className="flex my-3">
				<div className="mt-3 align-bottom font-bold text-blue-500 text-lg">
					View CSV Table <i className="text-sm font-light">(first 5 rows)</i>
				</div>
				<div className="form-switch ml-4 mt-3">
					<input
						type="checkbox"
						id="switch-1"
						className="sr-only"
						checked={togglePreview}
						onChange={() => setTogglePreview((p) => !p)}
					/>
					<label className="bg-gray-400" htmlFor="switch-1">
						<span className="bg-white shadow-sm" aria-hidden="true"></span>
						<span className="sr-only">Preview</span>
					</label>
				</div>
			</div>
			{togglePreview && (
				<div
					style={{ maxHeight: window.innerHeight * 0.5 }}
					className="overflow-x-auto overflow-y-auto"
				>
					<table className="table-auto w-full mt-1 overflow-x-scroll">
						{/* Table header */}
						<thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-t border-b border-gray-200">
							<tr>
								<th className="pl-4 py-3 whitespace-nowrap ">
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
								{columns.map((column, index) => (
									<th key={index} className="px-4 py-3 whitespace-nowrap">
										<div className="flex items-center">
											<span className="mr-2">{column}</span>
										</div>
									</th>
								))}
							</tr>
						</thead>
						{/* Table body */}
						<tbody className="bg-white">
							{data.map((row, index) => (
								<tr key={index}>
									{row.length === columns.length && (
										<>
											<td className="border-t border-b border-gray-200 px-4 py-3 whitespace-nowrap">
												<div className="flex items-center">
													<label className="inline-flex">
														<input
															className="form-checkbox"
															type="checkbox"
															// checked={selectAll}
															// onChange={handleSelectAll}
														/>
													</label>
												</div>
											</td>

											{row.map((item: any, index: number) => (
												<td
													key={index}
													className="border-t border-b border-gray-200 px-4 py-3 whitespace-nowrap"
												>
													<div className="flex items-center">
														<span className="mr-2">
															{item.length > 0 ? item : "-"}
														</span>
													</div>
												</td>
											))}
										</>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}

export default CSVTable;
