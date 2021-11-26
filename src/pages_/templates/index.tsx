import { useContext, useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import AddTemplateCard from "../../partials_/templates/AddTemplateCard";
import TemplateCard from "../../partials_/templates/TemplateCard";
import { useGetByOrganization } from "../../api/template";
import Context from "../../store/context";
import { template } from "../../store/templates/types";
import moment from "moment";

function Templates() {
	const { store, dispatch } = useContext(Context);
	const { isLoading, data, isError, error, refetch } = useGetByOrganization(
		store.user.organization
	);
	const [sidebarOpen, setSidebarOpen] = useState<any>(false);

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
								Your templates ✨
							</h1>
						</div>

						{/* Search form */}
						<div className="max-w-xl mb-5">
							<form className="relative">
								<label htmlFor="app-search" className="sr-only">
									Search
								</label>
								<input
									id="app-search"
									className="form-input w-full pl-9 py-3 focus:border-gray-300"
									type="search"
									placeholder="Search…"
								/>
								<button
									className="absolute inset-0 right-auto group"
									type="submit"
									aria-label="Search"
								>
									<svg
										className="w-4 h-4 flex-shrink-0 fill-current text-gray-400 group-hover:text-gray-500 ml-3 mr-2"
										viewBox="0 0 16 16"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
										<path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
									</svg>
								</button>
							</form>
						</div>

						{/* Filters */}
						<div className="mb-4 border-b border-gray-200">
							<ul className="text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
								<li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
									<a
										className="text-blue-500 hover:text-gray-600 whitespace-nowrap"
										href="#0"
									>
										Active
									</a>
								</li>
								<li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
									<a className="text-gray-500  whitespace-nowrap" href="#0">
										All
									</a>
								</li>
								<li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
									<a
										className="text-gray-500 hover:text-gray-600 whitespace-nowrap"
										href="#0"
									>
										Archived
									</a>
								</li>
							</ul>
						</div>

						{/* Templates */}
						<div>
							{/* <AddTemplateCard /> */}

							{isLoading ? (
								<div className="items-center h-full">
									<div className="spinner mr-4"></div>
									<p className="text-gray-500">Loading...</p>
								</div>
							) : (
								<>
									{data?.data.length > 0 ? (
										<div className="grid grid-cols-12 gap-4">
											{data?.data.map((template: template) => (
												<TemplateCard key={template._id} template={template} />
											))}
										</div>
									) : (
										<div className="text-xl w-full ">
											{
												"No templates to display. Create a new template to get started"
											}
											<div className="grid grid-cols-12 gap-0 mt-5">
												<AddTemplateCard />
											</div>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default Templates;
