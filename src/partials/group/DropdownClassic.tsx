import { useState, useRef, useEffect } from "react";
import Transition from "../../utils/Transition";

function DropdownClassic({ options }: { options: Array<any> }) {
	const [dropdownOpen, setDropdownOpen] = useState<any>(false);
	const [selected, setSelected] = useState<any>(2);

	const trigger = useRef<any>(null);
	const dropdown = useRef<any>(null);

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }: any) => {
			if (!dropdown.current) return;
			if (
				!dropdownOpen ||
				dropdown.current.contains(target) ||
				trigger.current.contains(target)
			)
				return;
			setDropdownOpen(false);
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	});

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }: any) => {
			if (!dropdownOpen || keyCode !== 27) return;
			setDropdownOpen(false);
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	});

	return (
		<div className="relative inline-flex">
			<button
				ref={trigger}
				className="btn justify-between min-w-44 bg-white border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600"
				aria-label="Select date range"
				aria-haspopup="true"
				onClick={() => setDropdownOpen(!dropdownOpen)}
				aria-expanded={dropdownOpen}
			>
				<span className="flex items-center">
					<span>{}</span>
				</span>
				<svg
					className="flex-shrink-0 ml-1 fill-current text-gray-400"
					width="11"
					height="7"
					viewBox="0 0 11 7"
				>
					<path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
				</svg>
			</button>
			<Transition
				appear={undefined}
				show={dropdownOpen}
				tag="div"
				className="z-10 absolute top-full left-0 w-full bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
				enter="transition ease-out duration-100 transform"
				enterStart="opacity-0 -translate-y-2"
				enterEnd="opacity-100 translate-y-0"
				leave="transition ease-out duration-100"
				leaveStart="opacity-100"
				leaveEnd="opacity-0"
			>
				<div
					ref={dropdown}
					className="font-medium text-sm text-gray-600 absolute z-60"
					onFocus={() => setDropdownOpen(true)}
					onBlur={() => setDropdownOpen(false)}
				>
					<button className="w-6 h-6 m-5 bg-blue-500 rounded-full ring-2 ring-blue-500 ring-offset-8"></button>
					<button className="w-6 h-6 m-5 bg-blue-500 rounded-full ring-2 ring-blue-500 ring-offset-8"></button>
					<button className="w-6 h-6 m-5 bg-blue-500 rounded-full ring-2 ring-blue-500 ring-offset-8"></button>
					<button className="w-6 h-6 m-5 bg-blue-500 rounded-full ring-2 ring-blue-500 ring-offset-8"></button>
					<button className="w-6 h-6 m-5 bg-blue-500 rounded-full ring-2 ring-blue-500 ring-offset-8"></button>
				</div>
			</Transition>
		</div>
	);
}

export default DropdownClassic;
