import React, { useState, useRef, useEffect } from "react";
import Transition from "../../utils/Transition";

function DropdownTemplate({ templates, setTemplate }: any) {
	const [dropdownOpen, setDropdownOpen] = useState<any>(false);
	const [selected, setSelected] = useState<any>("");
	const trigger = useRef<any>(null);
	const dropdown = useRef<any>(null);
	const [filter, setfilter] = useState("");
	const [value, setValue] = useState("Select templates");
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
		<div className="relative inline-flex w-full">
			<div className="relative w-full">
				<input
					placeholder="Search templates"
					ref={trigger}
					onClick={(e) => {
						setValue("");
						e.preventDefault();
						setDropdownOpen(!dropdownOpen);
					}}
					className="form-input w-full h-full pl-9"
					onChange={(e) => {
						setSelected("");
						setfilter(e.target.value);
						setValue(e.target.value);
					}}
					value={value}
				/>
				<button
					className="absolute inset-0 right-auto group"
					type="submit"
					aria-label="Search"
				>
					<svg
						className="w-4 h-4 flex-shrink-0 fill-current text-gray-400 group-hover:text-gray-500 ml-3 mr-2"
						viewBox="0 0 16 16"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
						<path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
					</svg>
				</button>
			</div>

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
					className="font-medium text-sm text-gray-600 divide-y divide-gray-200"
					onFocus={() => setDropdownOpen(true)}
					onBlur={() => setDropdownOpen(false)}
				>
					{templates?.map((template: any) => {
						if (template.name.toLowerCase().includes(filter.toLowerCase()))
							return (
								<button
									key={template.description}
									tabIndex={0}
									className={`flex items-center justify-between w-full hover:bg-gray-50 py-2 px-3 cursor-pointer ${
										template === selected && "text-blue-500"
									}`}
									onClick={(e) => {
										e.preventDefault();
										setSelected(template);
										setDropdownOpen(false);
										setValue(template.name);
										setTemplate(template);
									}}
								>
									<div className="text-left font-bold text-xs w-1/3">
										{template.name}
									</div>
									<div className="text-xs text-blue-500 text-left w-2/3 flex flex-row">
										{template.description}{" "}
										<svg
											className={`ml-2 mt-1  flex-shrink-0 mr-2 fill-current text-blue-500 ${
												template !== selected && "invisible"
											}`}
											width="12"
											height="9"
											viewBox="0 0 12 9"
										>
											<path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
										</svg>
									</div>
								</button>
							);
						else return null;
					})}
				</div>
			</Transition>
		</div>
	);
}

export default DropdownTemplate;
