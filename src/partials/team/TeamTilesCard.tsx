import { Link } from "react-router-dom";
import EditMenu from "../../components/ui/DropdownEditMenu";
import image from "../../images/group-image.jpg";
function TeamTilesCard(props: any) {
	return (
		<div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
			<div className="flex flex-col h-full">
				{/* Card top */}
				<div className="flex-grow p-5">
					<div className="flex justify-between items-start">
						{/* Image + name */}
						<header>
							<div className="flex mb-2">
								<Link
									className="relative inline-flex items-start mr-5"
									to={props.link}
								>
									<div className="flex items-center">
										<span className="text-sm font-medium text-gray-400 "></span>{" "}
										<span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="icon icon-tabler icon-tabler-chart-arcs"
												width="36"
												height="36"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="#2c3e50"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<circle cx="12" cy="12" r="1" />
												<path d="M16.924 11.132a5 5 0 1 0 -4.056 5.792" />
												<path d="M3 12a9 9 0 1 0 9 -9" />
											</svg>
										</span>
									</div>
								</Link>
								<div className="mt-1 pr-1">
									<Link
										className="inline-flex text-gray-800 hover:text-gray-900"
										to={props.link}
									>
										<h2 className="text-xl leading-snug justify-center font-semibold">
											{props.name}
										</h2>
									</Link>
								</div>
							</div>
						</header>

						{/* Menu button */}
						<EditMenu
							align="right"
							className="relative inline-flex flex-shrink-0"
						>
							<li>
								<button
									className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
									onClick={() => {}}
								>
									Remove
								</button>
							</li>
						</EditMenu>
					</div>
					{/* Bio */}
					<div className="flex flex-row bg-indigo-200 py-5 align-center bg-opacity-75 blur-50  w-full">
						<div>
							<img
								src={image}
								style={{ height: "80px" }}
								className="ml-8 mr-5 mt-5 rounded-full"
								alt="group"
							/>
						</div>
						<div className="ml-5 font-bold text-sm">
							<div className="mt-2">
								Number of Recipients: <span className="text-indigo-500">0</span>
							</div>
							<div className="mt-2">
								Number of Certificates:{" "}
								<span className="text-indigo-500">0</span>
							</div>
							<div className="mt-2">
								Created by: <span className="text-indigo-500">0</span>
							</div>
							<div className="mt-2">
								Created at:{" "}
								<span className="text-indigo-500">{props.createdAt}</span>
							</div>
						</div>
					</div>
					<div className="mt-2">
						<div className="text-sm">{props.content}</div>
					</div>
				</div>
				{/* Card footer */}
				<div className="border-t border-gray-200">
					<div className="flex divide-x divide-gray-200r">
						<Link
							className="block flex-1 text-center text-sm text-indigo-500 hover:text-indigo-600 font-medium px-3 py-4"
							to={"/group/" + props.id}
						>
							<div className="flex items-center justify-center">
								<svg
									className="w-4 h-4 fill-current text-gray-400 group-hover:text-gray-500 flex-shrink-0 mr-2"
									viewBox="0 0 16 16"
								>
									<path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
								</svg>
								<span>Edit Group</span>
							</div>
						</Link>
						<Link
							className="block flex-1 text-center text-sm text-gray-600 hover:text-gray-800 font-medium px-3 py-4 group"
							to="/settings"
						>
							<div className="flex items-center justify-center text-indigo-500 hover:text-indigo-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="text-gray-400 group-hover:text-gray-500 mr-1"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="#667eea"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<circle cx="15" cy="15" r="3" />
									<path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" />
									<path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73" />
									<line x1="6" y1="9" x2="18" y2="9" />
									<line x1="6" y1="12" x2="9" y2="12" />
									<line x1="6" y1="15" x2="8" y2="15" />
								</svg>
								<span>Create Certificates</span>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TeamTilesCard;
