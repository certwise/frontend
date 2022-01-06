import { Link } from "react-router-dom";
import Icon from "../../images/icon-03.svg";

function DashboardCard03({
	group,
	total,
	notIngroup,
}: {
	group: number;
	total: number;
	notIngroup: number;
}) {
	return (
		<div className="flex flex-col col-span-full  xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
			<div className="px-5 pt-5">
				<header className="flex justify-between items-start mb-2">
					{/* Icon */}
					<img src={Icon} width="32" height="32" alt="Icon 03" />
					{/* Menu button */}
					<Link
						to="/recipients/list"
						className="text-blue-500 text-sm text-gray-600 hover:font-bold flex py-1 px-3"
					>
						Manage Recipients -&gt;
					</Link>
				</header>
				<h2 className="text-lg font-semibold text-gray-800 mb-2">Recipients</h2>
				<div className="flex flex-row">
					<div>
						<div className="text-xs font-semibold text-gray-400 uppercase">
							Groups
						</div>
						<div className="flex items-start">
							<div className="text-3xl font-bold text-gray-800 mr-2 text-blue-500">
								{group || 0}{" "}
								<span className="text-xs font-medium text-blue-500">
									groups of recipients
								</span>
							</div>
						</div>
						<div className="text-xs font-semibold text-gray-400 uppercase mt-2">
							Recipients in groups
						</div>
						<div className="flex items-start">
							<div className="text-3xl font-bold text-gray-800 mr-2">
								{total - (notIngroup || 0) || 0}
							</div>
						</div>
						<div className="text-xs font-semibold text-gray-400 uppercase mt-2">
							Recipients not in any group
						</div>
						<div className="flex items-start mb-2">
							<div className="text-3xl font-bold text-gray-800 mr-2 text-yellow-600">
								{notIngroup || 0}{" "}
							</div>
						</div>
					</div>
					<div className="flex-shrink ml-auto h-full mt-5">
						<div className="font-semibold w-full text-gray-400 text-center my-auto">
							ALL
							<div className="">
								<div className="text-4xl font-bold mr-2 text-blue-500">
									{total || 0}{" "}
								</div>
								<div className="text-xs text-center mr-2 text-blue-500">
									number of recipients
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Chart built with Chart.js 3 */}
			<div className="flex-grow">
				{/* Change the height attribute to adjust the chart height */}
			</div>
		</div>
	);
}

export default DashboardCard03;
