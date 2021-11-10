import { useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import View from "./View";
import { useGetTemplateByIdQuery } from "../../api/templateQueries";
import { useParams } from "react-router-dom";

function Template() {
	const [sidebarOpen, setSidebarOpen] = useState<any>(false);
	const { id } = useParams<any>();
	const { data, isLoading, isError, error } = useGetTemplateByIdQuery(id);
	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar */}
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				{/*  Site header */}
				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<main>
					{isLoading && isError ? (
						<div>Loading...</div>
					) : (
						<View template={data?.data} />
					)}
				</main>
			</div>
		</div>
	);
}

export default Template;
