import { useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import View from "./View";
import { useParams } from "react-router-dom";

function Template() {
	const [sidebarOpen, setSidebarOpen] = useState<any>(false);
	const { id } = useParams<any>();
	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				<main>
					<View templateId={id} />
				</main>
			</div>
		</div>
	);
}

export default Template;
