import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../images/certificate-128.png";
import { BiUser } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { MdPayment } from "react-icons/md";
import { FaCertificate } from "react-icons/fa";
import { HiOutlineTemplate } from "react-icons/hi";
import { VscDashboard } from "react-icons/vsc";
function Sidebar({ sidebarOpen, setSidebarOpen }: any) {
	const location = useLocation();
	const { pathname } = location;
	const page = pathname.split("/")[1];
	const trigger = useRef<any>(null);
	const sidebar = useRef<any>(null);
	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }: any) => {
			if (!sidebar.current || !trigger.current) return;
			if (
				!sidebarOpen ||
				sidebar.current.contains(target) ||
				trigger.current.contains(target)
			)
				return;
			setSidebarOpen(false);
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	});

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }: any) => {
			if (!sidebarOpen || keyCode !== 27) return;
			setSidebarOpen(false);
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	});

	return (
		<div className="lg:w-64">
			{/* Sidebar backdrop (mobile only) */}
			<div
				className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
					sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				aria-hidden="true"
			></div>

			{/* Sidebar */}
			<div
				id="sidebar"
				ref={sidebar}
				className={`absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll 
				lg:overflow-y-auto no-scrollbar w-64 flex-shrink-0 
				bg-gray-800 p-4 transition-transform duration-200 ease-in-out ${
					sidebarOpen ? "translate-x-0" : "-translate-x-64"
				}`}
			>
				{/* Sidebar header */}
				<div className="flex justify-between mb-10 pr-3 sm:px-2">
					{/* Close button */}
					<button
						ref={trigger}
						className="lg:hidden text-gray-500 hover:text-gray-400"
						onClick={() => setSidebarOpen(!sidebarOpen)}
						aria-controls="sidebar"
						aria-expanded={sidebarOpen}
					>
						<span className="sr-only">Close sidebar</span>
						<svg
							className="w-6 h-6 fill-current"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
						</svg>
					</button>
					{/* Logo */}
					<NavLink exact to="/" className="block">
						<div className="flex flex-row">
							<img
								src={logo}
								style={{ height: "40px" }}
								className="mt-4"
								alt="CertWise"
							></img>
							<span
								className="ml-3 text-4xl text-primary align-text-top "
								style={{ fontFamily: "Parisienne" }}
							>
								Certwise
							</span>
						</div>
					</NavLink>
				</div>

				{/* Links */}
				<div>
					<h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
						Pages
					</h3>
					<ul className="mt-3">
						{/* Dashboard */}
						<li
							className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
								page === "" && "bg-gray-900"
							}`}
						>
							<NavLink
								exact
								to="/"
								className={`block text-primary hover:text-primary-focus transition duration-150 ${
									page === "" && "hover:text-gray-200"
								}`}
							>
								<div className="flex flex-grow">
									<VscDashboard className="flex-shrink-0 h-6 w-6 mr-3" />
									<span className="text-sm font-medium" />
									<span className="text-sm font-medium">Dashboard</span>
								</div>
							</NavLink>
						</li>
						{/* Templates */}
						<li
							className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
								page === "customers" && "bg-gray-900"
							}`}
						>
							<NavLink
								exact
								to="/templates"
								className={`block text-primary hover:text-primary-focus transition duration-150 ${
									page === "customers" && "hover:text-gray-200"
								}`}
							>
								<div className="flex flex-grow">
									<HiOutlineTemplate className="flex-shrink-0 h-6 w-6 mr-3" />
									<span className="text-sm font-medium">Templates</span>
								</div>
							</NavLink>
						</li>
						{/* Certificates */}
						<li
							className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
								page === "orders" && "bg-gray-900"
							}`}
						>
							<NavLink
								exact
								to="/certificates"
								className={`block text-primary hover:text-primary-focus transition duration-150 ${
									page === "orders" && "hover:text-gray-200"
								}`}
							>
								<div className="flex items-center justify-between">
									<div className="flex flex-grow">
										<FaCertificate className="flex-shrink-0 h-6 w-6 mr-3" />
										<span className="text-sm font-medium">Certificates</span>
									</div>
								</div>
							</NavLink>
						</li>
						{/* Payments */}
						<li
							className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
								page === "campaigns" && "bg-gray-900"
							}`}
						>
							<NavLink
								exact
								to="/payments"
								className={`block text-primary hover:text-primary-focus transition duration-150 ${
									page === "campaigns" && "hover:text-gray-200"
								}`}
							>
								<div className="flex flex-grow">
									<MdPayment className="flex-shrink-0 h-6 w-6 mr-3" />
									<span className="text-sm font-medium">Payments</span>
								</div>
							</NavLink>
						</li>

						{/* Profile */}
						<li
							className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
								page === "messages" && "bg-gray-900"
							}`}
						>
							<NavLink
								exact
								to="/user"
								className={`block text-primary hover:text-primary-focus transition duration-150 ${
									page === "messages" && "hover:text-gray-200"
								}`}
							>
								<div className="flex flex-grow">
									<div className="flex-shrink-0 h-6 w-6 mr-3">
										<BiUser className="mr-3" />
									</div>
									<span className="text-sm font-medium">Your Profile</span>
								</div>
							</NavLink>
						</li>
						{/* Settings */}
						<li
							className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
								page.startsWith("team-") && "bg-gray-900"
							}`}
						>
							<NavLink
								exact
								to="/settings"
								className={`block text-primary hover:text-primary-focus transition duration-150 ${
									page.startsWith("team-") && "hover:text-gray-200"
								}`}
							>
								<div className="flex items-center justify-between">
									<div className="flex flex-grow">
										<FiSettings className="mr-5" />
										<span className="text-sm font-medium">Settings</span>
									</div>
								</div>
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
