import { Link } from "react-router-dom";
function Navbar({ isSignedIn }: { isSignedIn: boolean }) {
	return (
		<>
			<div className="navbar pd-2 shadow-lg ">
				<div className="flex-1 px-2 mx-2">
					<span className="text-3xl">Certify</span>
				</div>
				<div className="flex-none hidden px-2 mx-2 lg:flex">
					{isSignedIn ? (
						<div className="flex items-stretch">
							<Link
								to="/"
								className="m-2 text-sm  uppercase hover:bg-gray-200 p-2 rounded-md font-medium transition-all duration-300"
							>
								Home
							</Link>
							<Link
								to="/templates"
								className="m-2 text-sm  uppercase hover:bg-gray-200 p-2 rounded-md font-medium transition-all duration-300"
							>
								Templates
							</Link>
							<Link
								to="/certificates"
								className="m-2 text-sm  uppercase hover:bg-gray-200 p-2 rounded-md font-medium transition-all duration-300"
							>
								Certificates
							</Link>
							<Link
								to="/user"
								className="m-2 text-sm  uppercase hover:bg-gray-200 p-2 rounded-md font-medium transition-all duration-300"
							>
								User
							</Link>
						</div>
					) : (
						<div className="flex items-stretch">
							<Link
								to="/"
								className="m-2 text-sm  uppercase hover:bg-gray-200 p-2 rounded-md font-medium transition-all duration-300"
							>
								Home
							</Link>
							<Link
								to="/signin"
								className="m-2 text-sm  uppercase hover:bg-gray-200 p-2 rounded-md font-medium transition-all duration-300"
							>
								Sign In
							</Link>
							<Link
								to="/signup"
								className="m-2 text-sm  uppercase hover:bg-gray-200 p-2 rounded-md font-medium transition-all duration-300"
							>
								SignUp
							</Link>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default Navbar;
