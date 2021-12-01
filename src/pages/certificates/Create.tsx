import { useContext, useState } from "react";
import TemplatesGrid from "../../partials/certificates/TemplatesGrid";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import { Context } from "../../store";

function Create() {
	const { store, dispatch } = useContext(Context);
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
	return (
		<div>
			<div className="flex h-screen overflow-hidden">
				{/* Sidebar */}
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				{/* Content area */}
				<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
					{/*  Site header */}
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					{/*  Page number */}
					<div className="px-4 pt-12 pb-8">
						<div className="max-w-md mx-auto w-full">
							<div className="relative">
								<div
									className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-gray-200"
									aria-hidden="true"
								></div>
								<ul className="relative flex justify-between w-full">
									<li>
										<div
											className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-blue-500 text-white`}
										>
											1
										</div>
									</li>
									<li>
										<div
											className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-gray-100 text-gray-500`}
										>
											2
										</div>
									</li>
									<li>
										<div
											className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-gray-100 text-gray-500`}
										>
											3
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				{/*  Page number  end*/}

				<div>
					<TemplatesGrid />
				</div>
			</div>
		</div>
	);
}

export default Create;
