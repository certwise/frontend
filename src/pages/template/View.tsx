import moment from "moment";
import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import {
	useGetDefaultBaseImage,
	useGetSavedImage,
	useUpdate,
} from "../../api/template";
import { template } from "../../store/types";

function View({
	template,
	refetch,
}: {
	template: template;
	refetch: () => void;
}) {
	const image = useGetSavedImage(
		template?._id || "",
		template?.organization || ""
	);
	const defaultImage = useGetDefaultBaseImage();
	const { id } = useParams<any>();
	const [redirect, setRedirect] = useState("");
	const [isRenaming, setIsRenaming] = useState(false);
	const [form, setform] = useState({
		name: template?.name || "",
		description: template?.description || "",
	});
	const [error, setError] = useState("");
	const update = useUpdate();
	useEffect(() => {
		return () => {
			setRedirect("");
		};
	}, []);
	useEffect(() => {
		if (update.isSuccess) {
			setIsRenaming(false);
			refetch();
		}
	}, [update.isSuccess]);
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
				{/* Page header */}

				{/* Page content */}
				<div
					style={{ borderBottom: "none" }}
					className="border-2 border-gray-300  mb-5 h-full shadow-lg"
				>
					{!image.isLoading && !defaultImage.isLoading && !image.isError && (
						<div className="p-2 flex justify-center bg-gray-100">
							<img
								className=""
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
						<div className="p-2 flex justify-center bg-gray-100">
							<img
								className=""
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
						<div style={{ height: "450px" }}>
							<div className="animate-pulse w-full h-full">
								<div className="bg-blue-300 p-5 h-full w-full flex flex-row items-center align-middle justify-center ">
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

					<div
						style={{ borderTop: "none" }}
						className="flex justify-center p-3 border-b-2 py-8 border-gray-300"
					>
						<button
							onClick={() => {
								setRedirect("/template/edit/" + id);
							}}
							className="btn bg-blue-500 hover:bg-blue-600 text-white flex-grow rounded-sm"
						>
							Edit template
						</button>
						<button
							onClick={() => {
								setRedirect("/template/edit/" + id);
							}}
							className="btn bg-blue-500 hover:bg-blue-600 text-white ml-2 flex-grow rounded-sm"
						>
							Go to certificates
						</button>
						<button
							onClick={() => {
								setRedirect("/template/edit/" + id);
							}}
							className="btn bg-blue-500 hover:bg-blue-600 text-white ml-2 flex-grow rounded-sm"
						>
							Archive Template
						</button>
						<button
							onClick={() => {
								setRedirect("/template/edit/" + id);
							}}
							className="btn bg-white hover:bg-white border-red-500 hover:font-bold text-red-500 ml-2 flex-grow rounded-sm"
						>
							Delete
						</button>
					</div>
				</div>
				<div>Created at: {moment(template?.createdAt).format("llll")}</div>
				<div>Description: {template?.description}</div>

				{/* Page content */}
			</div>
		);
}

export default View;
