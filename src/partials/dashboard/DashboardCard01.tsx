import { Link } from "react-router-dom";
import Icon from "../../images/icon-01.svg";
import EditMenu from "../../components/ui/DropdownEditMenu";

function DashboardCard01({
	total,
	issued,
	created,
	revoked,
}: {
	total: number;
	issued: number;
	created: number;
	revoked: number;
}) {
	return (
		<div className="flex flex-col col-span-full xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
			<div className="px-5 pt-5">
				<header className="flex justify-between items-start mb-2">
					{/* Icon */}
					<img src={Icon} width="32" height="32" alt="Icon 01" />
					<Link
						to="/certificates/list"
						className="text-blue-500 text-sm text-gray-600 hover:font-bold flex py-1 px-3"
					>
						All Credentials &gt;
					</Link>
				</header>
				<h2 className="text-lg font-semibold text-gray-800 mb-2">
					Credentials
				</h2>
				<div className="flex flex-row">
					<div>
						<div className="text-xs font-semibold text-gray-400 uppercase">
							Total
						</div>
						<div className="flex items-start">
							<div className="text-3xl font-bold text-gray-800 mr-2 text-blue-500">
								{total || 0}{" "}
								<span className="text-xs font-medium text-blue-500">
									total credentials
								</span>
							</div>
						</div>
						<div className="text-xs font-semibold text-gray-400 uppercase mt-2">
							Created
						</div>
						<div className="flex items-start">
							<div className="text-3xl font-bold text-gray-800 mr-2">
								{created || 0}
							</div>
						</div>
						<div className="text-xs font-semibold text-gray-400 uppercase mt-2">
							Revoked
						</div>
						<div className="flex items-start mb-2">
							<div className="text-3xl font-bold text-gray-800 mr-2 text-yellow-600">
								{revoked || 0}{" "}
							</div>
						</div>
					</div>
					<div className="flex-shrink ml-auto h-full mt-5">
						<div className="font-semibold w-full text-gray-400 text-center my-auto">
							ISSUED
							<div className="">
								<div className="text-4xl font-bold mr-2 text-blue-500">
									{issued || 0}{" "}
								</div>
								<div className="text-xs text-center mr-2 text-blue-500">
									total credentials issued
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashboardCard01;
