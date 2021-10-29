function WelcomeBanner({ name }: { name: string | null }) {
	return (
		<div className="relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
			{/* Background illustration */}
			<div className="w-100"></div>

			{/* Content */}
			<div className="relative">
				<h1 className="text-2xl md:text-3xl text-gray-800 font-bold mb-1">
					Good afternoon, {name}. 👋
				</h1>
				<p>Here is your CertWise stats for today:</p>
			</div>
		</div>
	);
}

export default WelcomeBanner;

const Shape = () => {
	<svg
		style={{ height: "50px" }}
		id="sw-js-blob-svg"
		viewBox="0 0 100 100"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			{" "}
			<linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
				<stop id="stop1" stop-color="rgba(102, 126, 234, 1)" offset="0%"></stop>
				<stop id="stop2" stop-color="rgba(0, 188, 212, 1)" offset="100%"></stop>
			</linearGradient>{" "}
		</defs>
		<path
			fill="url(#sw-gradient)"
			d="M24,-16.8C31.9,-9.2,39.7,0.8,38.4,9.5C37,18.2,26.4,25.5,15,31C3.6,36.4,-8.7,40,-17.9,36C-27,32,-33.1,20.5,-33.7,10C-34.3,-0.6,-29.4,-10.1,-22.9,-17.4C-16.4,-24.7,-8.2,-29.7,-0.1,-29.7C8,-29.6,16.1,-24.4,24,-16.8Z"
			width="100%"
			height="100%"
			transform="translate(50 50)"
			stroke-width="0"
			style={{ transition: "all 0.3s ease 0s" }}
			stroke="url(#sw-gradient)"
		></path>{" "}
	</svg>;
};
