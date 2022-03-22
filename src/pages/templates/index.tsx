import { useContext, useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import TemplateCard from "../../partials/templates/TemplateCard";
import { useGetByOrganization } from "../../api/template";
import { Context } from "../../store";
import { template } from "../../store/types";
import { Link, useHistory } from "react-router-dom";
import EmptyState from "../../partials/EmptyState";
import Loader from "../../partials/Loader";
// TODO add empty state
function Templates() {
	const { store } = useContext(Context);
	const { isLoading, data } = useGetByOrganization(store.user.organization);
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
	const [search, setSearch] = useState("");
	const history = useHistory();
	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar */}
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				{/*  Site header */}
				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<main>
					{isLoading && (
						<div className="my-auto">
							<Loader />
						</div>
					)}
					{!isLoading && data?.data?.length === 0 && (
						<EmptyState
							title={"No templates found."}
							description="Create a template to get started."
							button="Create New Template"
							onClick={(e: any) => {
								e.stopPropagation();
								history.push("/template/create");
							}}
						/>
					)}

					{!isLoading && data?.data?.length > 0 && (
						<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
							{/* Page header */}
							<div className="mb-5">
								{/* Title */}
								<h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
									Your templates ✨
								</h1>
							</div>
							{/* Search form */}
							<div className="w-full mb-5 flex flex-row">
								<form className="w-1/3 relative">
									<label htmlFor="app-search" className="sr-only">
										Search
									</label>
									<input
										id="app-search"
										className="form-input w-full pl-12 py-2 focus:border-gray-300"
										type="search"
										placeholder="Search…"
										value={search}
										onChange={(e) => setSearch(e.target.value)}
									/>
									<button
										className="absolute inset-0 right-auto group px-2"
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
								<Link
									to="/template/create"
									className="btn-sm bg-blue-500 p-0  hover:bg-blue-600 text-white ml-8 px-2 pr-4"
								>
									<svg
										className="w-3 h-3 fill-current opacity-75 flex-shrink-0 ml-1"
										viewBox="0 0 16 16"
									>
										<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
									</svg>
									<span className="hidden xs:block ml-2">Create Template</span>
								</Link>
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

							<div className="grid grid-cols-12 gap-4">
								{data?.data.map((template: template) => {
									if (
										template.name
											.toLowerCase()
											.includes(search.toLowerCase().trim())
									) {
										return (
											<TemplateCard key={template._id} template={template} />
										);
									} else {
										return null;
									}
								})}
							</div>
						</div>
					)}
				</main>
			</div>
		</div>
	);
}

export default Templates;
