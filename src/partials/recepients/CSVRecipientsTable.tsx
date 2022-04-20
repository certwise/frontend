import { useState } from "react";
import { recipient } from "../../store/types";
import CSVRecipientsTableItem from "./CSVRecipientTableItem";

function RecipientsTableCSV({ recipients }: { recipients: recipient[] }) {
	const [togglePreview, setTogglePreview] = useState(false);

	return (
		<div className="bg-white  rounded-sm  relative">
			<div>
				<div className="flex my-3">
					<div className="mt-3 align-bottom font-bold text-blue-500 text-lg">
						View Recipients<i className="text-sm font-light">(first 5 rows)</i>
					</div>
					<div className="form-switch ml-4 mt-3">
						<input
							type="checkbox"
							id="switch-recipients"
							className="sr-only"
							checked={togglePreview}
							onChange={() => setTogglePreview((p) => !p)}
						/>
						<label className="bg-gray-400" htmlFor="switch-recipients">
							<span className="bg-white shadow-sm" aria-hidden="true"></span>
							<span className="sr-only">Preview</span>
						</label>
					</div>
				</div>
				{togglePreview && (
					<div className="overflow-x-auto">
						<table className="table-auto w-full">
							{/* Table header */}
							<thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-t border-b border-gray-200">
								<tr>
									<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
										<div className="font-semibold text-left">Name</div>
									</td>
									<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
										<div className="font-semibold text-left">Email</div>
									</td>
									{recipients[0]?.customFields &&
										recipients[0]?.customFields.map((field) => (
											<td
												className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap "
												key={field.name}
											></td>
										))}
								</tr>
							</thead>
							{/* Table body */}
							<tbody className="text-sm divide-y divide-gray-200">
								{recipients &&
									recipients.map((recipient) => {
										return (
											<CSVRecipientsTableItem
												key={Math.random()}
												recipient={recipient}
												orgCustomFields={recipients[0]?.customFields}
											/>
										);
									})}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}

export default RecipientsTableCSV;
