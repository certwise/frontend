import { useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import Tooltip from "../../components/ui/Tooltip";
import { useCreateTemplateQuery } from "../../api/templateQueries";
import { createTemplate } from "../../partials_/template/createTemplate";
import { Redirect } from "react-router-dom";

function CreateTemplate({ uid }: { uid: string }) {
	const [sidebarOpen, setSidebarOpen] = useState<any>(false);
	const { mutate, isLoading, isError, isSuccess } = useCreateTemplateQuery();
	const [form, setForm] = useState({
		name: "",
		description: "",
		uid,
	});
	if (isSuccess) return <Redirect push to="/templates" />;
	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar */}
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				{/*  Site header */}
				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<main>
					<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
						{/* Page header */}
						<div className="mb-5">
							{/* Title */}
							<h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
								Create a new template✨
							</h1>
						</div>

						{/* Form */}
						<div className="mb-5">
							{/* Title */}
							<h1 className="text-lg  text-gray-800 font-bold">
								Template details
							</h1>
						</div>
						<div className="max-w-xl mr-auto">
							<div className="mb-3">
								<label
									className="block text-sm font-medium mb-1"
									htmlFor="default"
								>
									Template Name
								</label>
								<input
									id="default"
									onChange={(e) => {
										setForm({ ...form, name: e.target.value });
									}}
									className="form-input w-full"
									type="text"
								/>
							</div>
							<div className="mb-3 min-h-16">
								<label
									className="block text-sm font-medium mb-1"
									htmlFor="default"
								>
									Template Description
								</label>
								<textarea
									onChange={(e) => {
										setForm({ ...form, description: e.target.value });
									}}
									id="default"
									className="form-input w-full "
								/>
							</div>
							<div className="mb-4 flex-grow">
								<div className="flex items-center justify-between">
									<label
										className="block text-sm font-medium mb-1"
										htmlFor="tooltip"
									>
										Canvas Ratio
									</label>
									<Tooltip className="ml-2" bg="dark" size="md">
										<div className="text-sm text-gray-200">
											Excepteur sint occaecat cupidata non proident, sunt.
										</div>
									</Tooltip>
								</div>
								<input
									id="tooltip"
									className="form-input w-full"
									type="number"
								/>
							</div>
							<div className="flex flex-row w-full">
								<div className="mr-3 flex-grow">
									<div className="flex items-center justify-between">
										<label
											className="block text-sm font-medium mb-1"
											htmlFor="tooltip"
										>
											Canvas Width
										</label>
										<Tooltip className="ml-2" bg="dark" size="md">
											<div className="text-sm text-gray-200">
												Excepteur sint occaecat cupidata non proident, sunt.
											</div>
										</Tooltip>
									</div>
									<input
										id="tooltip"
										className="form-input w-full"
										type="text"
									/>
								</div>
								<div className="ml-3 flex-grow">
									<div className="flex items-center justify-between">
										<label
											className="block text-sm font-medium mb-1"
											htmlFor="tooltip"
										>
											Canvas Height
										</label>
										<Tooltip className="ml-2" bg="dark" size="md">
											<div className="text-sm text-gray-200">
												Excepteur sint occaecat cupidata non proident, sunt.
											</div>
										</Tooltip>
									</div>
									<input
										id="tooltip"
										className="form-input w-full"
										type="text"
									/>
								</div>
							</div>
							<div className="mt-6  text-sm font-medium">
								Or choose a pre-existing template
							</div>
							<div className="flex">
								<div
									style={{ height: "200px" }}
									className="bg-white h-full w-full mt-3 shadow-xl form-input p-0"
								>
									Choose a background image
								</div>
							</div>
						</div>
						{/* End of templates */}
						{/* Form */}
						<div className="my-5">
							{/* Title */}
							<h1 className="text-lg  text-gray-800 font-bold">
								Access details
							</h1>
						</div>
						<div className="max-w-xl mr-auto">
							<div className="mb-3">
								<label
									className="block text-sm font-medium mb-1"
									htmlFor="default"
								>
									Owner Name
								</label>
								<input id="default" className="form-input w-full" type="text" />
							</div>
							<div className="mb-3 min-h-16">
								<label
									className="block text-sm font-medium mb-1"
									htmlFor="default"
								>
									Allow access to
								</label>
								<textarea id="default" className="form-input w-full " />
							</div>
							<div className="mb-4 flex-grow">
								<div className="flex items-center justify-between">
									<label
										className="block text-sm font-medium mb-1"
										htmlFor="tooltip"
									>
										*****
									</label>
									<Tooltip className="ml-2" bg="dark" size="md">
										<div className="text-sm text-gray-200">
											Excepteur sint occaecat cupidata non proident, sunt.
										</div>
									</Tooltip>
								</div>
								<input
									id="tooltip"
									className="form-input w-full"
									type="number"
								/>
							</div>
						</div>
						<button
							onClick={() => {
								mutate(
									createTemplate({
										name: form.name,
										description: form.description,
										uid,
									})
								);
							}}
							className="btn bg-indigo-500 hover:bg-indigo-600 text-white mt-5"
						>
							<svg
								className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
								viewBox="0 0 16 16"
							>
								<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
							</svg>
							<span className="ml-2">Create template</span>
						</button>
					</div>
				</main>
			</div>
		</div>
	);
}

export default CreateTemplate;
