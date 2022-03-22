import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
function LandingHeader() {
	const [mobileNavOpen, setMobileNavOpen] = useState<any>(false);
	const [top, setTop] = useState<any>(true);

	const trigger = useRef<any>(null);
	const mobileNav = useRef<any>(null);
	const { path } = useRouteMatch();
	// close the mobile menu on click outside
	useEffect(() => {
		const clickHandler = ({ target }: any) => {
			if (!mobileNav.current || !trigger.current) return;
			if (
				!mobileNavOpen ||
				mobileNav.current.contains(target) ||
				trigger.current.contains(target)
			)
				return;
			setMobileNavOpen(false);
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	});

	// close the mobile menu if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }: any) => {
			if (!mobileNavOpen || keyCode !== 27) return;
			setMobileNavOpen(false);
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	});

	// detect whether user has scrolled the page down by 10px
	useEffect(() => {
		const scrollHandler = () => {
			window.pageYOffset > 10 ? setTop(false) : setTop(true);
		};
		window.addEventListener("scroll", scrollHandler);
		return () => window.removeEventListener("scroll", scrollHandler);
	}, [top]);

	return (
		<header
			className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
				!top && "bg-white shadow-lg"
			}`}
		>
			<div className="max-w-6xl mx-auto px-5 sm:px-6">
				<div className="flex items-center justify-between h-16 md:h-20">
					{/* Site branding */}
					<div className="flex-shrink-0 mr-4">
						{/* Logo */}
						<a
							href="https://certwise.app"
							rel="noopener noreferrer"
							className="block flex flex-row"
							aria-label="Certwise"
						>
							{/* <svg
								className="w-8 h-8"
								viewBox="0 0 32 32"
								xmlns="http://www.w3.org/2000/svg"
							>
								<defs>
									<radialGradient
										cx="21.152%"
										cy="86.063%"
										fx="21.152%"
										fy="86.063%"
										r="79.941%"
										id="header-logo"
									>
										<stop stopColor="#4FD1C5" offset="0%" />
										<stop stopColor="#81E6D9" offset="25.871%" />
										<stop stopColor="#338CF5" offset="100%" />
									</radialGradient>
								</defs>
								<rect
									width="32"
									height="32"
									rx="16"
									fill="url(#header-logo)"
									fillRule="nonzero"
								/>
							</svg> */}
							<span className="inline font-bold text-blue-500 hover:text-blue-600 ml-2 mt-1 hover:underline">
								&lt; Homepage
							</span>
						</a>
					</div>

					{/* Desktop navigation */}
					<nav className="hidden md:flex md:flex-grow">
						{/* Desktop menu links */}
						<ul className="flex flex-grow justify-end flex-wrap items-center text-sm">
							{path.includes("signup") && (
								<li>
									{/* <Link
									to="/signup"
									className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 w-full my-2"
								>
									<span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-teal-500">
										Early Access &#8594;
									</span>
								</Link> */}
									Already using Certwise?{"  "}
									<Link
										to="/signin"
										className="text-blue-600 hover:underline transition duration-150 ease-in-out"
									>
										Sign in
									</Link>
								</li>
							)}
							{path.includes("signin") && (
								<li>
									Don't have an account?{"  "}
									<Link
										to="/signup"
										className="text-blue-600 hover:underline transition duration-150 ease-in-out"
									>
										Sign up
									</Link>
								</li>
							)}
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}

export default LandingHeader;
