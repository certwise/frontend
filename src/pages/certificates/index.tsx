import { useState, useContext } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import SearchForm from "../../partials/actions/SearchForm";
import DeleteButton from "../../partials/actions/DeleteButton";
import CertificatesTable from "../../partials/certificates/CertificatesTable";
import { Context } from "../../store";
import { useGetByOrganization } from "../../api/certificate";
import { Link, useHistory } from "react-router-dom";
import { certificate } from "../../store/types";
import EmptyState from "../../partials/EmptyState";
import Loader from "../../partials/Loader";
import PaginationClassic from "../../partials/ui/PaginationClassic";

function Certificates() {
	const { store } = useContext(Context);
	const [query, setQuery] = useState("");
	const [filter, setFilter] = useState<
		"all" | "created" | "revoked" | "issued"
	>("all");
	const [sidebarOpen, setSidebarOpen] = useState<any>(false);
	const [selectedItems, setSelectedItems] = useState<any>([]);
	const data = useGetByOrganization(store.user.organization);
	const handleSelectedItems = (selectedItems: any) => {
		setSelectedItems([...selectedItems]);
	};
	const history = useHistory();

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<main>
					{data.isLoading && (
						<div className="my-auto">
							<Loader />
						</div>
					)}
					{!data.isLoading && data.data?.data.length === 0 && (
						<EmptyState
							title={"No certificates found."}
							description="Create a certificate for a recipient or a group."
							button="Create Certificate"
							onClick={(e: any) => {
								e.stopPropagation();
								history.push("/certificates/create");
							}}
						/>
					)}
					{!data.isLoading && data.data?.data.length > 0 && (
						<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
							{/* Page header */}
							<div className="sm:flex sm:justify-between sm:items-center mb-5">
								{/* Left: Title */}
								<div className="mb-4 sm:mb-0">
									<h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
										Certificates ✨
									</h1>
								</div>

								{/* Right: Actions */}
								<div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
									{/* Search form */}
									<SearchForm
										onChange={(e: any) => {
											setQuery(e.target.value);
										}}
										placeholder="Search certificates..."
									/>
									{/* Add member button */}
									<Link
										to="/certificates/create"
										className="btn-sm px-3 bg-blue-500 hover:bg-blue-600 text-white"
									>
										<svg
											className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
											viewBox="0 0 16 16"
										>
											<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
										</svg>
										<span className="hidden xs:block ml-2">
											Create Certificate(s)
										</span>
									</Link>
								</div>
							</div>

							{/* More actions */}
							<div className="sm:flex sm:justify-between sm:items-center mb-5">
								{/* Left side */}
								<div className="mb-4 sm:mb-0">
									<ul className="flex flex-wrap -m-1">
										<li className="m-1">
											<button
												onClick={() => setFilter("all")}
												className={`inline-flex items-center justify-center text-sm font-medium 
										leading-5 rounded-full px-3 py-1 border 
										shadow-sm ${
											filter === "all"
												? `bg-blue-500 text-white border-transparent `
												: `border-gray-200 
										hover:border-gray-300 shadow-sm bg-white text-gray-500`
										} duration-150 ease-in-out`}
											>
												All{" "}
												<span
													className={`ml-1 ${
														filter === "all" ? `text-white` : `text-blue-500`
													}`}
												>
													{data.data ? data.data.data.length : 0}
												</span>
											</button>
										</li>
										<li className="m-1">
											<button
												onClick={() => setFilter("issued")}
												className={`inline-flex items-center justify-center text-sm font-medium 
										leading-5 rounded-full px-3 py-1 border 
										shadow-sm ${
											filter === "issued"
												? `bg-blue-500 text-white border-transparent `
												: `border-gray-200 
										hover:border-gray-300 shadow-sm bg-white text-gray-500`
										} duration-150 ease-in-out`}
											>
												Issued{" "}
												<span
													className={`ml-1 ${
														filter === "issued" ? `text-white` : `text-blue-500`
													}`}
												>
													{data.data
														? (data.data.data as certificate[]).filter(
																(x) => x.isIssued
														  ).length
														: 0}
												</span>
											</button>
										</li>
										<li className="m-1">
											<button
												onClick={() => setFilter("created")}
												className={`inline-flex items-center justify-center text-sm font-medium 
										leading-5 rounded-full px-3 py-1 border 
										shadow-sm ${
											filter === "created"
												? `bg-blue-500 text-white border-transparent `
												: `border-gray-200 
										hover:border-gray-300 shadow-sm bg-white text-gray-500`
										} duration-150 ease-in-out`}
											>
												Created{" "}
												<span
													className={`ml-1 ${
														filter === "created"
															? `text-white`
															: `text-blue-500`
													}`}
												>
													{data.data
														? (data.data.data as certificate[]).filter(
																(x) => !x.isIssued && !x.isRevoked
														  ).length
														: 0}
												</span>
											</button>
										</li>
										<li className="m-1">
											<button
												onClick={() => setFilter("revoked")}
												className={`inline-flex items-center justify-center text-sm font-medium 
										leading-5 rounded-full px-3 py-1 border 
										shadow-sm ${
											filter === "revoked"
												? `bg-blue-500 text-white border-transparent `
												: `border-gray-200 
										hover:border-gray-300 shadow-sm bg-white text-gray-500`
										} duration-150 ease-in-out`}
											>
												Revoked{" "}
												<span
													className={`ml-1 ${
														filter === "revoked"
															? `text-white`
															: `text-blue-500`
													}`}
												>
													{data.data
														? (data.data.data as certificate[]).filter(
																(x) => x.isRevoked
														  ).length
														: 0}
												</span>
											</button>
										</li>
									</ul>
								</div>

								{/* Right side */}
								<div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
									{/* Delete button */}
									<DeleteButton selectedItems={selectedItems} />
									{/* Dropdown */}
									{/* <DateSelect />
								{/* Filter button */}
									{/* <FilterButton align="right" /> */}
								</div>
							</div>

							{/* Table */}
							<CertificatesTable
								filter={filter}
								query={query}
								certificates={data.data?.data}
								selectedItems={handleSelectedItems}
							/>

							{/* Pagination */}
							<div className="mt-8">
								<PaginationClassic start={1} end={"Last"} total="all" />
							</div>
						</div>
					)}
				</main>
			</div>
		</div>
	);
}

export default Certificates;
