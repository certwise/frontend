import { useContext, useEffect } from "react";
import { useCreate, useCreateMany } from "../../../api/certificate";
import TemplateCard from "./TemplateCard";
import { Context } from "../../../store";
import { certificate, template } from "../../../store/types";

function CreateSingleCertificate() {
	const { store } = useContext(Context);
	useEffect(() => {}, []);
	const create = useCreate();
	const createMany = useCreateMany();
	const template = store.certificates.createCertificate.selectedTemplate;
	const recipient = store.certificates.createCertificate.selectedRecipient;
	const fields = store.certificates.createCertificate.singleCertificateFields;
	const onCreateSingle = (e: any) => {
		e.preventDefault();
		const certificate: certificate = {
			issuer: store.user.uid,
			templateId: template?._id as string,
			issueDate: false,
			createdAt: new Date(),
			lastUpdated: new Date(),
			validTill: false,
			recipient: recipient?._id as string,
			fields: fields,
			organization: store.user.organization,
			isIssued: false,
			group: false,
			isRevoked: false,
		};
		create.mutate(certificate);
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
						{store.certificates.createCertificate.singleCertificateFields.map(
							(field, index) => {
								return (
									<tr
										className="w-full my-2 border-b border-gray-400 py-3"
										key={index}
									>
										<td className="w-1/3 px-4 text-left py-3">{field.name} </td>
										<td className="w-1/3 px-4 font-bold text-blue-500 text-left py-3">
											{field.value}
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
				{!create.isLoading && !createMany.isLoading && (
					<button
						onClick={onCreateSingle}
						className="my-3 btn  bg-blue-500 hover:bg-blue-600 text-white ml-2"
					>
						<svg
							className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
							viewBox="0 0 16 16"
						>
							<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
						</svg>
						<span className="hidden xs:block ml-2">
							Create Certificate for {""}
							{store.certificates.createCertificate.selectedRecipient?.name}
						</span>
					</button>
				)}
				{(create.isLoading || createMany.isLoading) && (
					<button className="mt-3 mb-8  btn bg-blue-200 text-white ml-2">
						<svg
							className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
							viewBox="0 0 16 16"
						>
							<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
						</svg>
						<span className="hidden xs:block ml-2">
							Create Certificate for {""}
							{store.certificates.createCertificate.selectedRecipient?.name}
						</span>
					</button>
				)}
			</div>
			{/* <div>
				{!create.isLoading && !createMany.isLoading && (
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
							{store.certificates.createCertificate.selectedRecipient?.name}
						</span>
					</button>
				)}
				{(create.isLoading || createMany.isLoading) && (
					<button className="mt-3 mb-8  btn bg-blue-200 text-white ml-2">
						<svg
							className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
							viewBox="0 0 16 16"
						>
							<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
						</svg>
						<span className="hidden xs:block ml-2">
							Create and Issue Certificate for{" "}
							{store.certificates.createCertificate.selectedRecipient?.name}
						</span>
					</button>
				)}
			</div> */}
		</div>
	);
}

export default CreateSingleCertificate;
