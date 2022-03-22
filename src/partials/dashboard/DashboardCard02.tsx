import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../images/icon-02.svg";

// Import utilities

function DashboardCard02({
	total,
	archived,
}: {
	total: number;
	archived: number;
}) {
	return (
		<div className="flex flex-col col-span-full  xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
			<div className="px-5 pt-5">
				<header className="flex justify-between items-start mb-2">
					{/* Icon */}
					<img src={Icon} width="32" height="32" alt="Icon 02" />
					{/* Menu button */}
					<Link
						to="/templates"
						className="text-blue-500 text-sm text-gray-600 hover:font-bold flex py-1 px-3"
					>
						All Templates &gt;
					</Link>
				</header>
				<h2 className="text-lg font-semibold text-gray-800 mb-2">Templates</h2>
				<div className="flex flex-row">
					<div>
						<div className="text-xs font-semibold text-gray-400 uppercase">
							All templates
						</div>
						<div className="flex items-start">
							<div className="text-3xl font-bold text-blue-500  mr-2">
								{total || 0}{" "}
								<span className="text-xs font-medium text-blue-500">
									total templates
								</span>
							</div>
						</div>
						<div className="text-xs font-semibold text-gray-400 uppercase mt-2">
							Archived
						</div>
						<div className="flex items-start">
							<div className="text-3xl font-bold  text-gray-800 mr-2">
								{archived || 0}
							</div>
						</div>
						<div className="text-xs font-semibold text-gray-400 uppercase mt-2">
							Recently opened:
						</div>
						<div className="flex items-start">
							<div className="mt-2 text-xs font-bold text-blue-500 text-gray-800 mr-2 mb-3">
								&gt; Template name1
							</div>
						</div>
					</div>
					<div className="flex-shrink ml-auto h-full mt-5">
						<div className="font-semibold w-full text-gray-400 text-center my-auto">
							ACTIVE
							<div className="ml-3">
								<div className="text-4xl font-bold mr-2 text-blue-500">
									{(total || 0) - (archived || 0)}{" "}
								</div>
								<div className="text-xs text-center mr-2 text-blue-500">
									templates currently in use
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

export default DashboardCard02;
