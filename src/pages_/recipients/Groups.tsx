import { useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import SearchForm from "../../partials/actions/SearchForm";
import TeamTilesCard from "../../partials/team/TeamTilesCard";
import PaginationNumeric from "../../partials/PaginationNumeric";
import {
	group,
	useCreateGroup,
	useGetGroup,
	useGetGroups,
} from "../../api/groupQueries";
import Context from "../../store/context";
import { useContext } from "react";
import ModalBasic from "../../components/ui/ModalBasic";
import axios from "axios";
import { env } from "../../config";
import moment from "moment";
function Groups() {
	const { store, dispatch } = useContext(Context);
	const [basicModalOpen, setBasicModalOpen] = useState<any>(false);
	const [groupDetails, setGroupDetails] = useState({
		name: "",
		description: "",
	});
	const { data, refetch } = useGetGroups(store.user.institution);
	const create = useCreateGroup();
	const items = data?.data;
	const [sidebarOpen, setSidebarOpen] = useState<any>(false);
	const createNewGroup = () => {
		const group: group = {
			name: groupDetails.name,
			description: groupDetails.description,
			created_at: new Date(),
			updated_at: new Date(),
			recipients: [],
			institution: store.user.institution,
		};
		// axios.post(env.url + "/group", group).then((res) => {
		// 	setBasicModalOpen(false);
		// 	refetch();
		// });
		create.mutate(group);
	};
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
						<div className="sm:flex sm:justify-between sm:items-center mb-8">
							{/* Left: Title */}
							<div className="mb-4 sm:mb-0">
								<h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
									Group Groups ✨
								</h1>
							</div>

							{/* Right: Actions */}
							<div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
								{/* Search form */}
								<SearchForm />
								{/* Add member button */}

								<button
									className="btn bg-blue-500 hover:bg-blue-600 text-white"
									onClick={(e) => {
										e.stopPropagation();
										setBasicModalOpen(true);
									}}
								>
									<svg
										className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
										viewBox="0 0 16 16"
									>
										<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
									</svg>
									<span className="hidden xs:block ml-2">Create Group</span>
								</button>
							</div>
						</div>
						<ModalBasic
							id="basic-modal"
							modalOpen={basicModalOpen}
							setModalOpen={setBasicModalOpen}
							title="Add group"
						>
							{/* Modal content */}
							<div className="px-5 pt-4 pb-1">
								<div className="text-sm">
									{/* <div className="font-medium text-gray-800 mb-2">
										Add a new group:
									</div> */}
									<div className="space-y-2">
										<div>
											{/* Start */}
											<div className="my-6">
												<label
													className="block text-sm font-medium mb-1"
													htmlFor="default"
												>
													Group Name
												</label>
												<input
													id="default"
													className="form-input w-full"
													type="text"
													onChange={(e) =>
														setGroupDetails({
															...groupDetails,
															name: e.target.value,
														})
													}
												/>
											</div>
											<div className="my-6">
												<label
													className="block text-sm font-medium mb-1"
													htmlFor="default"
												>
													Group Description
												</label>
												<input
													id="default"
													className="form-input w-full"
													type="text"
													onChange={(e) =>
														setGroupDetails({
															...groupDetails,
															description: e.target.value,
														})
													}
												/>
											</div>

											{/* End */}
										</div>
									</div>
								</div>
							</div>
							{/* Modal footer */}
							<div className="px-5 py-4">
								<div className="flex flex-wrap justify-end space-x-2">
									<button
										className="btn-sm border-gray-200 hover:border-gray-300 text-gray-600"
										onClick={(e) => {
											e.stopPropagation();
											setBasicModalOpen(false);
										}}
									>
										Cancel
									</button>
									{!create.isLoading ? (
										<button
											onClick={() => createNewGroup()}
											className="btn-sm bg-blue-500 hover:bg-blue-600 text-white"
										>
											Create New Group
										</button>
									) : (
										<button className="btn-sm bg-blue-300 text-white">
											Create New Group
										</button>
									)}
								</div>
							</div>
						</ModalBasic>

						{/* Cards */}
						<div className="grid grid-cols-12 gap-6">
							{items?.map((item: any) => {
								return (
									<TeamTilesCard
										key={item.id}
										id={item.id}
										recipients={item.recipients}
										name={item.name}
										location={item.location}
										content={item.description}
										createdAt={moment(item.created_at).format("lll")}
									/>
								);
							})}
						</div>

						{/* Pagination  <div className="mt-8">
							<PaginationNumeric />
						</div> */}
					</div>
				</main>
			</div>
		</div>
	);
}

export default Groups;
