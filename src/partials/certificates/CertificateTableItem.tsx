import moment from "moment";
import { useState } from "react";
import { useGetOne } from "../../api/recipient";
import { useGetOne as useGetOneTemplate } from "../../api/template";
import ModalBlank from "../../components/ui/ModalBlank";
import { MdOutlineCopyAll } from "react-icons/md";
import { certificate, recipient } from "../../store/types";
import * as certificateQuery from "../../api/certificate";
import { ImNewTab } from "react-icons/im";
function CertificatesTableItem({
	filter,
	certificate,
	query,
}: {
	filter: "all" | "created" | "revoked" | "issued";
	certificate: certificate;
	query: string;
}) {
	const [basicModalOpen, setBasicModalOpen] = useState<any>(false);
	const [enabled, setEnabled] = useState(false);
	const image = certificateQuery.useGetImage(
		enabled,
		`${certificate.organization}/certificates/${certificate._id}.jpg` as string
	);
	const recipientQuery = useGetOne(certificate.recipient);
	const recipient: recipient = recipientQuery.data?.data;
	const template = useGetOneTemplate(certificate.templateId);
	const editCertificate = certificateQuery.useUpdate();
	const issue = certificateQuery.useIssueOne();
	let status = certificate.isIssued ? "Issued" : "Created";
	if (certificate.isRevoked) {
		status = "Revoked";
	}

	const statusColor = (status: any) => {
		switch (status) {
			case "Issued":
				return "bg-green-100 text-green-600";
			case "Created":
				return "bg-yellow-100 text-yellow-600";
			case "Revoked":
				return "bg-red-100 text-red-500";
			default:
				return "bg-gray-100 text-gray-500";
		}
	};

	// TODO copy link of certificate to clipboard on clicking copy icon
	if (
		(filter === "all" ||
			(filter === "created" &&
				!certificate.isIssued &&
				!certificate.isRevoked) ||
			(filter === "issued" && certificate.isIssued && !certificate.isRevoked) ||
			(filter === "revoked" && certificate.isRevoked)) &&
		(recipient?.name.toLowerCase().includes(query.toLowerCase()) ||
			recipient?.email.toLowerCase().includes(query.toLowerCase()) ||
			template.data?.data.name.toLowerCase().includes(query.toLowerCase()) ||
			certificate._id?.toLowerCase().includes(query.toLowerCase()))
	)
		return (
			<>
				<tr>
					<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
						<div className="flex items-center">
							<label className="inline-flex">
								<span className="sr-only">Select</span>
								<input
									id={certificate._id}
									className="form-checkbox"
									type="checkbox"
									//onChange={handleClick}
									//checked={isChecked}
								/>
							</label>
						</div>
					</td>
					<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap ">
						<div className="flex flex-row">
							<button
								onClick={(e) => {
									e.stopPropagation();
									setEnabled(true);
									setBasicModalOpen(true);
								}}
								className="font-bold text-xs text-blue-500"
							>
								{certificate._id}
							</button>
							<button className="ml-2">
								<MdOutlineCopyAll
									className="mt-0.5 ml-1 hover:text-blue-500"
									onClick={() =>
										navigator.clipboard.writeText(certificate._id as string)
									}
									size={16}
								/>
							</button>
						</div>
					</td>

					<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
						<div
							className={`inline-flex text-xs font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(
								status
							)}`}
						>
							{status}
						</div>
					</td>
					<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-xs  ">
						<div className="font-bold ">{recipient?.name}</div>
						<div className="font-medium ">{recipient?.email}</div>
					</td>
					<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-xs">
						<div>
							{status === "Created" && (
								<span className="text-yellow-500">
									{moment(certificate.lastUpdated).format("llll")}
								</span>
							)}
							{status === "Issued" && (
								<span className="text-green-600">
									{moment(certificate.lastUpdated).format("llll")}
								</span>
							)}
							{status === "Revoked" && (
								<span className="text-red-500">
									{moment(certificate.lastUpdated).format("llll")}
								</span>
							)}
						</div>
					</td>
					<td className="px-2 first:pl-5 last:pr-5 py-3 text-xs whitespace-nowrap text-green-500">
						<div>{moment(certificate.createdAt).format("ll")}</div>
					</td>
					<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-xs">
						<div className="flex items-center">
							{/* {typeIcon("Subscription")} */}
							<div>{template.data?.data.name || "Template"}</div>
						</div>
					</td>
					<td className="px-2 1 py-3">
						<a
							rel="noreferrer"
							href={"https://verify.certwise.app/" + certificate._id}
							target="_blank"
							className="btn text-gray-400 hover:text-gray-700 hover:cursor-pointer"
						>
							<ImNewTab size={24} />
						</a>
						<div className="space-x-1">
							{/* <button className="text-gray-400 hover:text-gray-500 rounded-full">
								<span className="sr-only">Edit</span>
								<svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
									<path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
								</svg>
							</button>
							<button className="text-gray-400 hover:text-gray-500 rounded-full">
								<span className="sr-only">Download</span>
								<svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
									<path d="M16 20c.3 0 .5-.1.7-.3l5.7-5.7-1.4-1.4-4 4V8h-2v8.6l-4-4L9.6 14l5.7 5.7c.2.2.4.3.7.3zM9 22h14v2H9z" />
								</svg>
							</button>
							<button className="text-red-500 hover:text-red-600 rounded-full">
								<span className="sr-only">Delete</span>
								<svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
									<path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
									<path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
								</svg>
							</button> */}
						</div>
						<ModalBlank
							id="basic-modal"
							modalOpen={basicModalOpen}
							setModalOpen={setBasicModalOpen}
							title="View Certificate"
							className="w-full max-w-lg h-min"
						>
							<div
								style={{
									height: window.innerHeight * 0.75,
									minWidth: window.innerWidth * 0.75,
								}}
								className="px-5 p-4 bg-blue-100 w-full"
							>
								{image.data && (
									<img
										src={image.data}
										style={{
											objectFit: "scale-down",
											maxHeight: window.innerHeight * 0.72,
										}}
										className="mx-auto my-auto"
										alt="certificate"
									/>
								)}
								{!image.data && (
									<div className="text-center my-auto text-xl font-blue-500">
										Loading certificate
									</div>
								)}
							</div>
							<div className="px-5 py-4">
								<div className="flex flex-wrap justify-end space-x-2">
									<button
										className="btn-sm text-red-500 border border-red-500 hover:border-gray-300 text-gray-600"
										onClick={(e) => {
											e.stopPropagation();
											setBasicModalOpen(false);
										}}
									>
										Close
									</button>
									{!certificate.isIssued ? (
										<button
											onClick={(e) => {
												issue.mutate(certificate._id as string);
												setBasicModalOpen(false);
											}}
											className="btn-sm bg-blue-500 hover:bg-blue-600 text-white"
										>
											Issue Certificate
										</button>
									) : (
										<button
											onClick={(e) => {
												editCertificate.mutate({
													...certificate,
													issueDate: false,
													isRevoked: true,
													lastUpdated: new Date(),
												});
												setBasicModalOpen(false);
											}}
											className="btn-sm bg-red-500 hover:bg-red-600 text-white"
										>
											Revoke Certificate
										</button>
									)}
								</div>
								<div></div>
							</div>
						</ModalBlank>
					</td>
				</tr>
			</>
		);
	else return null;
}

export default CertificatesTableItem;
