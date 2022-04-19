import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Transition from "../../utils/Transition";
import { signOut, getAuth } from "firebase/auth";
import UserAvatar from "../../images/recipient.jpg";
import { Context } from "../../store";
import { signOut as signOutStore } from "../../store/actions/user";
import ModalBasic from "./ModalBasic";
function DropdownProfile({ align }: any) {
	const { store, dispatch } = useContext(Context);
	const [dropdownOpen, setDropdownOpen] = useState<any>(false);

	const trigger = useRef<any>(null);
	const dropdown = useRef<any>(null);
	const [signOutModal, setSignOutModal] = useState(false);
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
				className="inline-flex justify-center items-center group"
				aria-haspopup="true"
				onClick={() => setDropdownOpen(!dropdownOpen)}
				aria-expanded={dropdownOpen}
			>
				<img
					className="w-8 h-8 rounded-full"
					src={UserAvatar}
					width="32"
					height="32"
					alt="User"
				/>
				<div className="flex items-center truncate">
					<span className="truncate ml-2 text-sm font-medium group-hover:text-gray-800">
						{store.user.name}
					</span>
					<svg
						className="w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-400"
						viewBox="0 0 12 12"
					>
						<path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
					</svg>
				</div>
			</button>

			<Transition
				appear={undefined}
				className={`origin-top-right z-10 absolute top-full min-w-44 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
					align === "right" ? "right-0" : "left-0"
				}`}
				show={dropdownOpen}
				enter="transition ease-out duration-200 transform"
				enterStart="opacity-0 -translate-y-2"
				enterEnd="opacity-100 translate-y-0"
				leave="transition ease-out duration-200"
				leaveStart="opacity-100"
				leaveEnd="opacity-0"
			>
				<div
					ref={dropdown}
					onFocus={() => setDropdownOpen(true)}
					onBlur={() => setDropdownOpen(false)}
				>
					<div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
						<div className="font-medium text-gray-800">
							{store.organization.name}
						</div>
						<div className="text-xs text-gray-500 italic">Administrator</div>
					</div>
					<ul>
						<li>
							<Link
								className="font-medium text-sm text-blue-500 hover:text-blue-600 flex items-center py-1 px-3"
								to="/account"
								onClick={() => setDropdownOpen(!dropdownOpen)}
							>
								Settings
							</Link>
						</li>
						<li>
							<button
								className="font-medium text-sm text-blue-500 hover:text-blue-600 flex items-center py-1 px-3"
								onClick={(e) => {
									e.stopPropagation();
									setSignOutModal(true);
								}}
							>
								Sign Out
							</button>
						</li>
					</ul>
				</div>
			</Transition>
			<ModalBasic
				id="signoutModal"
				modalOpen={signOutModal}
				setModalOpen={setSignOutModal}
				title={"Sign Out of " + store.user.email + "?"}
			>
				{/* Modal footer */}
				<div className="px-5 py-4">
					<div className="flex flex-wrap justify-end space-x-2">
						<button
							className="btn-sm border-gray-200 hover:border-gray-300 text-gray-600"
							onClick={(e) => {
								e.stopPropagation();
								setSignOutModal(false);
							}}
						>
							Cancel
						</button>
						<button
							onClick={(e) => {
								dispatch(signOutStore());
								signOut(getAuth()).then(() => {
									window.location.href = "/signin";
								});
							}}
							className="btn-sm bg-red-500 hover:font-bold text-white"
						>
							Sign Out
						</button>
					</div>
				</div>
			</ModalBasic>
		</div>
	);
}

export default DropdownProfile;
