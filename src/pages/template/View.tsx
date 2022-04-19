import moment from "moment";
import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import {
	useArchive,
	useDelete,
	useGetDefaultBaseImage,
	useGetNumberOfCertificateInTemplate,
	useGetOne,
	useGetSavedImage,
	useUnarchive,
	useUpdate,
} from "../../api/template";
import { useGet as useGetUser } from "../../api/user";
import { template } from "../../store/types";

function View({ templateId }: { templateId: string }) {
	const defaultImage = useGetDefaultBaseImage();
	const { id } = useParams<any>();
	const [redirect, setRedirect] = useState("");
	const [isRenaming, setIsRenaming] = useState(false);
	const [isEditingDescription, setIsEditingDescription] = useState(false);
	const update = useUpdate();
	const archive = useArchive();
	const unarchive = useUnarchive();
	const deleteTemplate = useDelete();
	const templateQuery = useGetOne(templateId);
	const template: template = templateQuery.data?.data;
	const user = useGetUser(template?.createdBy);
	const numberOfCertificates = useGetNumberOfCertificateInTemplate(id);
	const [form, setform] = useState({
		name: template?.name || "",
		description: template?.description || "",
	});
	const image = useGetSavedImage(
		template?._id || "",
		template?.organization || ""
	);

	useEffect(() => {
		return () => {
			setRedirect("");
		};
	}, []);

	useEffect(() => {
		if (update.isSuccess) {
			setIsRenaming(false);
			setIsEditingDescription(false);
			templateQuery.refetch();
			update.reset();
		}
	}, [
		update.isSuccess,
		archive.isSuccess,
		unarchive.isSuccess,
		templateQuery,
		update,
	]);

	useEffect(() => {
		if (deleteTemplate.isSuccess) setRedirect("/templates");
	}, [deleteTemplate.isSuccess]);

	if (redirect !== "") {
		return <Redirect push to={redirect} />;
	} else
		return (
			<div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
				{/* Page header */}
				<div className="flex mb-6 bg-white shadow-lg p-5 py-6">
					{/* Title */}
					{!isRenaming ? (
						<>
							<h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
								{template?.name}
							</h1>
							<button
								className="ml-4 btn bg-white hover:bg-white border-gray-400 
									hover:border-gray-300 text-gray-600"
								onClick={() => setIsRenaming(true)}
							>
								<svg
									className="w-4 h-4 fill-current text-gray-500 flex-shrink-0"
									viewBox="0 0 16 16"
								>
									<path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
								</svg>
								<span className="ml-2">Rename</span>
							</button>
						</>
					) : (
						<>
							<input
								className="text-lg text-gray-800 font-bold form-input"
								defaultValue={template?.name}
								onChange={(e) => setform({ ...form, name: e.target.value })}
							/>
							<button
								onClick={() => {
									update.mutate({ ...template, name: form.name });
								}}
								className="ml-4 btn bg-white hover:text-blue-600 border-blue-500 hover:border-blue-600"
							>
								Save
							</button>
							<button
								onClick={() => setIsRenaming(false)}
								className="ml-4 btn bg-white hover:text-red-600 border-red-500 hover:border-red-600"
							>
								Cancel
							</button>
						</>
					)}
					<button
						onClick={() => {
							setRedirect("/templates");
						}}
						className="ml-auto btn bg-white hover:bg-white border-gray-400 hover:border-gray-300 text-blue-500"
					>
						Back to all templates
					</button>
				</div>

				<div
					// style={{ borderBottom: "none" }}
					className="border-2 border-gray-100  mb-5 h-full shadow-lg"
				>
					{!image.isLoading && !defaultImage.isLoading && !image.isError && (
						<div className="p-2 flex justify-center bg-gray-50">
							<img
								src={image.data as any}
								style={{
									height: "450px",
									objectFit: "scale-down",
								}}
								alt="Template"
							/>
						</div>
					)}
					{!image.isLoading && !defaultImage.isLoading && image.isError && (
						<div className="p-2 flex justify-center bg-gray-50">
							<img
								src={defaultImage.data as any}
								style={{
									height: "450px",
									objectFit: "scale-down",
								}}
								alt="Template default"
							/>
						</div>
					)}
					{(image.isLoading || defaultImage.isLoading) && (
						<div style={{ height: "470px" }}>
							<div className="animate-pulse w-full h-full">
								<div className="bg-gray-100 p-5 h-full w-full flex flex-row items-center align-middle justify-center ">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-photo "
										width="300"
										height="300"
										viewBox="0 0 24 24"
										strokeWidth="1"
										stroke="#222"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<line x1="15" y1="8" x2="15.01" y2="8" />
										<rect x="4" y="4" width="16" height="16" rx="3" />
										<path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" />
										<path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" />
									</svg>
								</div>
							</div>
						</div>
					)}
				</div>
				<div className="flex justify-center py-3 ">
					<button
						onClick={() => {
							setRedirect("/template/edit/" + id);
						}}
						className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white flex-grow rounded"
					>
						Edit template
					</button>
					<button
						onClick={() => {
							setRedirect("/template/edit/" + id);
						}}
						className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white ml-2 flex-grow rounded"
					>
						Go to certificates
					</button>
					{template?.isArchived && (
						<button
							onClick={() => {
								unarchive.mutate(id);
							}}
							className="btn btn-sm bg-white border-green-500 hover:bg-green-500 hover:text-white text-green-600 ml-2 flex-grow rounded"
						>
							Unarchive Template
						</button>
					)}
					{!template?.isArchived && (
						<button
							onClick={() => {
								archive.mutate(id);
							}}
							className="btn btn-sm bg-white border-yellow-500 hover:bg-yellow-500 hover:text-white text-yellow-600 ml-2 flex-grow rounded"
						>
							Archive Template
						</button>
					)}
					<button
						onClick={() => {
							deleteTemplate.mutate(id);
						}}
						className="btn btn-sm bg-white border-red-500 hover:bg-red-500 hover:text-white  text-red-500 ml-2 flex-grow rounded"
					>
						Delete
					</button>
				</div>
				<div className="mt-5 space-y-5 flex flex-col">
					<div className="pb-5">
						<div className="pb-3">
							<b className="pt-2">Description:</b>
							{!isEditingDescription && (
								<button
									className="ml-4 btn btn-xs bg-white hover:bg-white border-gray-400 
									hover:border-gray-300 text-gray-600"
									onClick={() => setIsEditingDescription(true)}
								>
									<svg
										className="w-4 h-4 fill-current text-gray-500 flex-shrink-0"
										viewBox="0 0 16 16"
									>
										<path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
									</svg>
									<span className="ml-2">Edit</span>
								</button>
							)}{" "}
						</div>
						{isEditingDescription ? (
							<>
								<textarea
									className="mt-4 text-lg border border-gray-400 form-input w-full h-48"
									defaultValue={template?.description}
									onChange={(e) =>
										setform({ ...form, description: e.target.value })
									}
								/>
								<button
									onClick={() => {
										update.mutate({
											...template,
											description: form.description,
										});
									}}
									className="mt-4 btn bg-white hover:text-blue-600 border-blue-500 hover:border-blue-600"
								>
									Save
								</button>
								<button
									onClick={() => setIsEditingDescription(false)}
									className="ml-4 btn bg-white hover:text-red-600 border-red-500 hover:border-red-600"
								>
									Cancel
								</button>
							</>
						) : (
							<div className="">{template?.description}</div>
						)}
					</div>
					<div className="grid grid-cols-12 gap-5 w-full mb-4 pb-5">
						<div className="col-span-4">
							<b>Created by: </b>
							<span className="text-blue-500 font-bold">
								{user.data?.data.name}{" "}
								<i className="text-xs font-light">{template?.createdBy}</i>
							</span>
						</div>
						<div className="col-span-4">
							<b>Created at: </b>
							<span className="text-blue-500 font-bold">
								{moment(template?.createdAt).format("llll")}
							</span>
						</div>
						<div className="col-span-4">
							<b>Updated at: </b>
							<span className="text-blue-500 font-bold">
								{moment(template?.updatedAt).format("llll")}
							</span>
						</div>
						<div className="col-span-4">
							<b>Variables: </b>
							<span className="text-blue-500 font-bold">
								{template?.templateFields
									.map((field) => field.name.trim())
									.join(", ") || "None"}
							</span>
						</div>
						<div className="col-span-6">
							<b>Number of certificates: </b>
							<span className="text-blue-500 font-bold">
								{numberOfCertificates.data?.data.created || 0} created,{" "}
								<span className="text-green-500">
									{numberOfCertificates.data?.data.issued || 0} issued,{" "}
								</span>
								<span className="text-yellow-500">
									{numberOfCertificates.data?.data.revoked || 0} revoked
								</span>
							</span>
						</div>
					</div>
					<div className="col-span-12 mt-5 pb-12">
						<b className="align-top">Mail template: </b>
						<textarea className="mt-2 rounded border border-gray-400 w-full" />
					</div>
				</div>
			</div>
		);
}

export default View;
