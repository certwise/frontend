import { CustomField } from "../../store/types";
import { recipient } from "../../store/types";

function CSVRecipientsTableItem({
	recipient,
	orgCustomFields,
}: {
	recipient: recipient;
	orgCustomFields: CustomField[];
}) {
	return (
		<tr>
			<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
				<div className="flex items-center">
					<button className="font-medium text-blue-600 hover:text-blue-400">
						{recipient.name}
					</button>
				</div>
			</td>
			<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
				<div className="text-left">{recipient.email}</div>
			</td>
			{orgCustomFields &&
				orgCustomFields.map((field) => (
					<td
						className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
						key={field.name}
					>
						<div className="font-semibold">
							{recipient.customFields.find((i) => i.name === field.name)?.value}
						</div>
					</td>
				))}
		</tr>
	);
}

export default CSVRecipientsTableItem;
