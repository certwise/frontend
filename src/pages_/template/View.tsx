import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useGetTemplateImageQuery } from "../../api/templateQueries";
import { template } from "../../store/templates/types";

function View({ template }: { template: template }) {
	const { data, isLoading } = useGetTemplateImageQuery(
		template?.id || "",
		template?.uid || ""
	);
	const { id } = useParams<any>();
	const [redirect, setRedirect] = useState("");
	useEffect(() => {
		return () => {
			setRedirect("");
		};
	}, []);
	if (redirect !== "") {
		return <Redirect push to={redirect} />;
	} else
		return (
			<div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
				{/* Page header */}
				<div className="flex mb-6 bg-white shadow-lg p-5 py-6">
					{/* Title */}
					<h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
						{template?.name}
					</h1>
					<button className="ml-4 btn bg-white hover:bg-white border-gray-400 hover:border-gray-300 text-gray-600">
						<svg
							className="w-4 h-4 fill-current text-gray-500 flex-shrink-0"
							viewBox="0 0 16 16"
						>
							<path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
						</svg>
						<span className="ml-2">Rename</span>
					</button>
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
				<div className="bg-white  mb-5 h-full shadow-lg">
					<div className="flex justify-center bg-gray-100 border-2 border-gray-600">
						<img
							className="p-3"
							style={{ maxHeight: 500 }}
							src={data as any}
							alt="Template"
						/>
					</div>
					<div className="flex justify-center p-3">
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
							className="btn bg-white hover:bg-white border-gray-400 hover:border-gray-300 text-red-500 ml-2 flex-grow rounded-sm"
						>
							Delete
						</button>
					</div>
				</div>
				<div>Created at</div>
				<div>Created by</div>
				<div>Description</div>
				<div>Created by</div>
				<div>Image</div>
				<div>Go to created certificates</div>
				<div>Accessed by</div>
				<div>Edit template (Go to builder)</div>

				{/* Page content */}
			</div>
		);
}

export default View;
