import { useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import CSVMappingDropdown from "./CSVMappingDropdown";
function CSVMapFields({
	csvColumns,
	setMap,
}: {
	csvColumns: string[];
	setMap: (map: Array<{ recipient: string; csv: string }>) => void;
}) {
	const [recipientColumns, setrecipientColumn] = useState([
		{ id: Math.random(), name: "Name", type: "default" },
		{ id: Math.random(), name: "Email", type: "default" },
	]);
	const [map, setMapLocal] = useState<
		Array<{ recipient: string; csv: string }>
	>([]);

	return (
		<>
			<div className="my-5">
				<div className="text-lg text-blue-500 font-bold my-3">Map Fields</div>
				<table className="">
					<thead>
						<tr>
							<th className="px-4 py-2 border border-gray-400">
								Recipient Field
							</th>
							<th className="px-4 py-2 border border-gray-400">CSV field</th>
							<th />
							<th />
						</tr>
					</thead>
					<tbody>
						{recipientColumns.map((column, index) => (
							<tr key={index}>
								{column.type === "default" && (
									<td className="px-4 py-2 border border-gray-400">
										{column.name}
									</td>
								)}
								{column.type === "custom" && (
									<td className="px-4 py-2 border border-gray-400">
										<input
											className="input form-control rounded border border-blue-500 p-2"
											type="text"
											placeholder="Custom Recipient Field Name"
											onChange={(e) =>
												setrecipientColumn((cols) =>
													cols.map((c) =>
														c.id === column.id
															? { ...c, name: e.target.value }
															: c
													)
												)
											}
										/>
									</td>
								)}
								<td className="px-4 py-2 border border-gray-400">
									<CSVMappingDropdown
										options={csvColumns}
										onSelect={(columnOption) => {
											setMapLocal((map) => {
												console.log("Map", map);
												if (map?.find((m) => m.recipient === column.name))
													return map.map((m) =>
														m.recipient === column.name
															? { ...m, csv: columnOption }
															: m
													);
												else
													return [
														...map,
														{
															recipient: column.name,
															csv: columnOption,
														},
													];
											});
										}}
									/>
								</td>

								{index === recipientColumns.length - 1 && (
									<td className="px-2 py-2">
										<button
											onClick={() => {
												setrecipientColumn([
													...recipientColumns,
													{
														id: Math.random(),
														name: "",
														type: "custom",
													},
												]);
											}}
											className="py-2 px-2"
										>
											<GrAddCircle className="text-blue-500" size={24} />
										</button>
									</td>
								)}
								{column.type === "custom" && (
									<td className="py-2 px-2">
										<button
											onClick={() => {
												setrecipientColumn((cols) =>
													cols.filter((col) => col.id !== column.id)
												);
											}}
											className="py-2 px-2"
										>
											<AiOutlineMinusCircle
												className="text-red-500"
												size={24}
											/>
										</button>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
				<button
					onClick={() => {
						if (
							map.filter((m) => !!m.csv && !!m.recipient) &&
							map.length === recipientColumns.length
						)
							setMap(map);
						else alert("Please fill all the fields");
					}}
					className="my-3 btn bg-blue-500 hover:bg-blue-600 text-white  py-2 px-4 rounded"
				>
					Generate Recipients
				</button>
			</div>
		</>
	);
}

export default CSVMapFields;
