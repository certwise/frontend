import { useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import DeleteButton from "../../partials/group/DeleteButton";
import DateSelect from "../../components/ui/DateSelect";
import FilterButton from "../../components/ui/DropdownFilter";
import PaginationClassic from "../../components/ui/PaginationClassic";
import GroupTable from "../../partials/group/GroupTable";
import { useGetGroup } from "../../api/group";
import { group } from "../../store/types";
import { Link, useParams } from "react-router-dom";
import ModalBasic from "../../components/ui/ModalBasic";

function Recipients() {
	const { id }: any = useParams();
	const [sidebarOpen, setSidebarOpen] = useState<any>(false);
	const groupQuery = useGetGroup(id);
	const group: group = groupQuery?.data?.data;
	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar */}
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				{/*  Site header */}
				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<main>
					{group && (
						<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
							{/* Page header */}
							<div className="sm:flex sm:justify-between sm:items-center mb-8">
								{/* Left: Title */}
								<div className="mb-4 sm:mb-0">
									<h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
										{group.name} ✨
									</h1>
								</div>

								{/* Right: Actions */}
								<div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
									{/* Delete button */}
									<DeleteButton selectedItems={[]} />
									{/* Dropdown */}
									<DateSelect />
									{/* Filter button */}
									<FilterButton align="right" />
									{/* Add customer button */}
									<Link
										to="/recipients/list"
										onClick={(e) => {
											e.stopPropagation();
										}}
										className="btn bg-blue-500 hover:bg-blue-600 text-white"
									>
										<svg
											className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
											viewBox="0 0 16 16"
										>
											<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
										</svg>
										<span className="hidden xs:block ml-2">Add Recipient</span>
									</Link>
								</div>
							</div>

							{/* Table */}
							{!groupQuery.isLoading && <GroupTable group={group} />}

							{/* Pagination */}
							<div className="mt-8">
								<PaginationClassic />
							</div>
						</div>
					)}
				</main>
				<ModalBasic>
					<div></div>
				</ModalBasic>
			</div>
		</div>
	);
}

export default Recipients;
