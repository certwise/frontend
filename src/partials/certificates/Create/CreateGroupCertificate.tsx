import { useContext, useState } from "react";
import { useCreateMany } from "../../../api/certificate";
import TemplateCard from "./TemplateCard";
import { Context } from "../../../store";
import {
	certificate,
	CustomField,
	recipient,
	template,
} from "../../../store/types";
import { useGetByGroup } from "../../../api/recipient";

function CreateGroupCertificate() {
	const { store } = useContext(Context);
	const createMany = useCreateMany();
	const template = store.certificates.createCertificate.selectedTemplate;
	const group = store.certificates.createCertificate.selectedGroup;
	const groupQuery = useGetByGroup(group?._id || "");
	const recipients = groupQuery.data?.data as recipient[];
	const [customFieldValues, setcustomFieldValues] = useState<CustomField[]>([]);
	const onCreateMany = (e: any) => {
		e.preventDefault();
		const certificates: certificate[] = [];
		recipients.forEach((recipient) => {
			const recipientFields: CustomField[] = [];
			const templateCustomFields =
				store.certificates.createCertificate.selectedTemplate?.templateFields;
			if (templateCustomFields) {
				for (let i = 0; i < templateCustomFields?.length; i++) {
					let field = { ...templateCustomFields[i] };
					const groupField =
						store.certificates.createCertificate.groupCertificateFields?.find(
							(f) => f.templateField.name === field.name
						)?.groupField;
					if (groupField) {
						if (groupField === "name") field.value = recipient.name;
						else if (groupField === "email") field.value = recipient.email;
						else if (groupField === "organization")
							field.value = store.organization.name;
						else if (groupField.includes("| Custom value |"))
							field.value = customFieldValues.find(
								(f) => f.name === field.name
							)?.value;
						else {
							const groupFieldValue = recipient.customFields.find(
								(f) => f.name === groupField
							);
							if (groupFieldValue) field.value = groupFieldValue.value;
						}
					}
					recipientFields.push(field);
				}
			}
			const certificate: certificate = {
				issuer: store.user.uid,
				organization: store.organization._id || store.user.organization,
				isIssued: false,
				templateId:
					store.certificates.createCertificate.selectedTemplate?._id || "",
				createdAt: new Date(),
				lastUpdated: new Date(),
				issueDate: false,
				recipient: recipient._id || "",
				fields: recipientFields,
				group: group?._id || "",
				validTill: false,
				isRevoked: false,
			};
			certificates.push(certificate);
		});
		console.log(
			certificates.map((c) => c.fields),
			customFieldValues
		);
		createMany.mutate(certificates);
	};
	return (
		<div className="ml-2 max-w-xl">
			<div className="mt-5 text-lg font-bold">
				Certificate for{" "}
				{store.certificates.createCertificate.selectedRecipient?.name}
			</div>
			{template && template?.templateFields.length > 0 && (
				<table className="w-xl my-8 table-auto border border-gray-400 p-3 rounded-xl">
					<thead className="border-b border-gray-400">
						<tr>
							<th className="text-left px-4 py-3 ">Template Variable</th>
							<th className="text-left px-4 py-3 ">Recipient data</th>
						</tr>
					</thead>
					<tbody className="my-5 w-full">
						{store.certificates.createCertificate.groupCertificateFields.map(
							(field, index) => {
								return (
									<tr
										className="w-full my-2 border-b border-gray-400 py-3"
										key={index}
									>
										<td className="w-1/3 px-4 text-left py-3">
											{field.templateField.name}
										</td>
										<td className="w-1/3 px-4 font-bold text-blue-500 text-left py-3">
											{field.groupField.includes("| Custom value |") ? (
												<textarea
													className="input form-control, border border-gray-400 p-1 rounded"
													placeholder="Custom Value"
													onChange={(e) => {
														setcustomFieldValues((c) => {
															if (c.length === 0)
																return [
																	{
																		name: field.templateField.name,
																		value: e.target.value,
																	},
																];
															else if (
																c.find(
																	(cf) => cf.name === field.templateField.name
																)
															)
																return c.map((cf) =>
																	cf.name === field.templateField.name
																		? { ...cf, value: e.target.value }
																		: cf
																);
															return [
																...c,
																{
																	name: field.templateField.name,
																	value: e.target.value,
																},
															];
														});
													}}
												/>
											) : (
												<span>{field.groupField} </span>
											)}
										</td>
									</tr>
								);
							}
						)}
					</tbody>
				</table>
			)}
			{template && template?.templateFields.length === 0 && (
				<div className="text-yellow-600 text-sm my-5">
					No variables are in this template.
				</div>
			)}
			<div className="max-w-xl mb-4">
				Template image:
				<TemplateCard
					maxHeight={500}
					template={
						store.certificates.createCertificate.selectedTemplate as template
					}
				/>
			</div>

			<div>
				{!createMany.isLoading && (
					<button
						onClick={onCreateMany}
						className="mt-3 mb-8  btn bg-blue-500 hover:bg-blue-600 text-white ml-2"
					>
						<svg
							className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
							viewBox="0 0 16 16"
						>
							<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
						</svg>
						<span className="hidden xs:block ml-2">
							Create and Issue Certificate for{" "}
							{store.certificates.createCertificate.selectedGroup?.name}
						</span>
					</button>
				)}
				{createMany.isLoading && (
					<button className="mt-3 mb-8  btn bg-blue-200 text-white ml-2">
						<svg
							className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
							viewBox="0 0 16 16"
						>
							<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
						</svg>
						<span className="hidden xs:block ml-2">
							Create and Issue Certificate for{" "}
							{store.certificates.createCertificate.selectedGroup?.name}
						</span>
					</button>
				)}
			</div>
		</div>
	);
}

export default CreateGroupCertificate;
