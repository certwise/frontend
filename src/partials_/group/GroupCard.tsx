import { Link } from "react-router-dom";
import EditMenu from "../../components/ui/DropdownEditMenu";
import { GrUser, GrCertificate } from "react-icons/gr";
import { MdOutlineGroupAdd } from "react-icons/md";
import Tooltip from "../../partials_/Tooltip";
import ModalBlank from "../../components/ui/ModalBlank";
import { useState } from "react";
import { useSetGroup } from "../../api/groupQueries";
function GroupCard({ group }: { group: any }) {
	const [groupModalOpen, setGroupModalOpen] = useState(false);
	const [selectedColor, setSelectedColor] = useState("blue");
	const editGroup = useSetGroup(group.id);
	const [form, setform] = useState({
		name: group.name,
		desc: group.description,
	});
	const saveChanges = () => {
		const x = {
			...group,
			name: form.name,
			description: form.desc,
			color: selectedColor,
		};
		console.log(x);
		editGroup.mutate(x);
		editGroup.isSuccess && setGroupModalOpen(false);
	};
	return (
		<div className="col-span-full lg:col-span-6 md:col-span-6 sm:col-span-6 xl:col-span-4 bg-white shadow-xl rounded-sm border border-gray-200">
			<div className="flex flex-col h-full">
				{/* Card top */}
				<div className="flex-grow p-5">
					<div className="flex justify-between items-start ">
						{/* Image + name */}
						<header>
							<div className="flex mb-0.5 ">
								<Link
									className="relative inline-flex items-start mr-2"
									to={group.link}
								></Link>
								<div className="mt-1 pr-1 flex flex-row">
									<div
										className={`w-3 h-3 mr-2 mt-3 ml-1 bg-${
											group.color || "blue"
										}-500 p-1 rounded-full leading-snug`}
									/>
									<Link
										className="inline-flex text-gray-800 hover:text-gray-900"
										to={group.link}
									>
										<h2 className="text-2xl leading-snug justify-center font-semibold">
											{group.name}
										</h2>
									</Link>
								</div>
							</div>
						</header>

						{/* Menu button */}
						<EditMenu
							align="right"
							className="relative inline-flex flex-shrink-0 "
						>
							<li>
								<button
									className="font-medium text-sm text-blue-500 hover:text-blue-600 flex py-1 px-3 w-48 border-none"
									onClick={(e) => {
										e.stopPropagation();
										setGroupModalOpen(true);
									}}
								>
									Edit group properties
								</button>
							</li>
							<li>
								<button
									className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3 border-none"
									onClick={() => {}}
								>
									Remove
								</button>
							</li>
						</EditMenu>
					</div>
					{/* Bio */}
					<div className="f pb-4 mt-1 ">
						<div className="flex flex-row ml-2 text-sm text-gray-900">
							<div className="flex flex-row mt-2 mr-2">
								<span>
									<Tooltip
										position="right"
										bg="dark"
										size="lg"
										name={<GrUser size={18} />}
									>
										<div className="text-white">
											There are {group.recipients?.length} recipients in this
											group.
										</div>
									</Tooltip>
								</span>
								<span className="text-blue-600 ml-1">
									{group.recipients?.length}
								</span>
							</div>
							<div className="flex flex-row mt-2 ml-2">
								<span>
									<Tooltip
										position="right"
										bg="dark"
										size="lg"
										name={<GrCertificate size={20} />}
									>
										<div className="text-white">
											There are 0 certificates in this group.
										</div>
									</Tooltip>
								</span>
								<span className="text-blue-600 ml-1">0</span>
							</div>
						</div>
					</div>
					<div className="mt-2 ml-2">
						<div className="text-sm">{group.description}</div>
					</div>
				</div>
				{/* Card footer */}
				<div className="border-t border-gray-200">
					<div className="flex divide-x divide-gray-200r">
						<Link
							className="block flex-1 text-center text-sm text-blue-500 hover:text-blue-600 font-medium px-3 py-4"
							to={"/group/" + group.id}
						>
							<div className="flex items-center justify-center ">
								<MdOutlineGroupAdd size={24} fill="#999999" />
								<span className="ml-2 text-blue-500 hover:text-blue-600">
									Manage Recipients
								</span>
							</div>
						</Link>
						<Link
							className="block flex-1 text-center text-sm text-gray-600 hover:text-gray-800 font-medium px-3 py-4 group"
							to="/settings"
						>
							<div className="flex items-center justify-center text-blue-500 hover:text-blue-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="text-gray-400 group-hover:text-gray-500 mr-1"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="#888888"
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
			<ModalBlank
				id="group"
				modalOpen={groupModalOpen}
				setModalOpen={setGroupModalOpen}
				title="Add Selected users to group"
			>
				<div className="px-5 pt-4 pb-1">
					<div className="space-y-2">
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
								value={form.name}
								onChange={(e) => setform({ ...form, name: e.target.value })}
							/>
						</div>
						{/* End */}
					</div>
					<div className="space-y-2">
						{/* Start */}
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
								value={form.desc}
								onChange={(e) => {
									setform({ ...form, desc: e.target.value });
								}}
							/>
						</div>
						<div className="">
							<div className="font-medium text-sm">Select Group Color</div>
							<div className="flex flex-row">
								<Color
									isSelected={selectedColor === "blue"}
									onClick={() => {
										setSelectedColor("blue");
									}}
									color="blue"
								/>
								<Color
									isSelected={selectedColor === "indigo"}
									onClick={() => {
										setSelectedColor("indigo");
									}}
									color="indigo"
								/>
								<Color
									isSelected={selectedColor === "red"}
									onClick={() => {
										setSelectedColor("red");
									}}
									color="red"
								/>
								<Color
									isSelected={selectedColor === "yellow"}
									onClick={() => {
										setSelectedColor("yellow");
									}}
									color="yellow"
								/>
								<Color
									isSelected={selectedColor === "green"}
									onClick={() => {
										setSelectedColor("green");
									}}
									color="green"
								/>
							</div>
						</div>
						{/* End */}
					</div>
				</div>
				{/* Modal content */}
				{/* Modal footer */}
				<div className="px-5 py-4">
					<div className="flex flex-wrap justify-end space-x-2">
						<button
							className="btn-sm border-gray-200 hover:border-gray-300 text-gray-600"
							onClick={(e) => {
								e.stopPropagation();
								setGroupModalOpen(false);
							}}
						>
							Cancel
						</button>
						<button
							onClick={() => saveChanges()}
							className="btn-sm bg-blue-500 hover:bg-blue-600 text-white"
						>
							Save changes
						</button>
					</div>
				</div>
			</ModalBlank>
		</div>
	);
}

export default GroupCard;

const Color = ({
	color,
	isSelected,
	onClick,
}: {
	color: string;
	isSelected: boolean;
	onClick: () => void;
}) => {
	return (
		<div
			onClick={onClick}
			style={{
				height: "24px",
				width: "24px",
				padding: "2px",
			}}
			className={`m-2 ${isSelected && "bg-blue-600 rounded-full"} `}
		>
			<div
				style={{
					height: "20px",
					width: "20px",
					padding: "2px",
				}}
				className={` bg-white rounded-full`}
			>
				<div
					style={{
						height: "16px",
						width: "16px",
					}}
					className={`bg-${color}-500 rounded-full`}
				></div>
			</div>
		</div>
	);
};
