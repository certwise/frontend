import { useContext, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import { useDashboard } from "../api";
import { Context } from "../store";
// import FilterButton from "../components/ui/DropdownFilter";
// import Datepicker from "../components/ui/Datepicker";

function Dashboard() {
	const { store } = useContext(Context);
	const [sidebarOpen, setSidebarOpen] = useState<any>(false);
	const data = useDashboard(store.user.organization);
	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<main>
					<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
						{/* Welcome banner */}
						<WelcomeBanner />

						{/* Dashboard actions */}
						<div className="ml-1 font-bold sm:flex sm:items-center mb-8">
							You have no new notifications.{" "}
							<span>
								<button className="text-sm ml-3 font-medium text-blue-500 hover:font-bold">
									See all &gt;
								</button>
							</span>
						</div>

						<div className="grid grid-cols-12 gap-6">
							<DashboardCard01
								total={data.data?.data.certificates.total}
								issued={data.data?.data.certificates.issued}
								created={data.data?.data.certificates.created}
								revoked={data.data?.data.certificates.revoked}
							/>
							<DashboardCard03
								group={data.data?.data.groups}
								total={data.data?.data.recipients.total}
								notIngroup={data.data?.data.recipients.notIngroup}
							/>
							<DashboardCard02
								total={data.data?.data.templates.total}
								archived={data.data?.data.templates.archived}
							/>
							<DashboardCard04 />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default Dashboard;
