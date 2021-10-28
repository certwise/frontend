import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Transition from "../../../utils/admin/Transition";

import UserAvatar from "../../../images/admin/user-avatar-32.png";
import { getAuth, signOut } from "firebase/auth";
import Context from "../../../store/context";
import { signOut as signOutStore } from "../../../store";
import { AiOutlineUser } from "react-icons/ai";
function UserMenu() {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const { dispatch } = useContext(Context);
	const trigger = useRef<any>(null);
	const dropdown = useRef<any>(null);
	const auth = getAuth();
	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }: any) => {
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
	const signOutFunction = () => {
		signOut(auth)
			.then(() => {
				dispatch(signOutStore());
				window.location.href = "/";
			})
			.catch(() => {
				alert("Signout failed");
			});
	};
	return (
		<div className="relative inline-flex">
			<button
				ref={trigger}
				className="inline-flex justify-center items-center group "
				aria-haspopup="true"
				onClick={() => setDropdownOpen(!dropdownOpen)}
				aria-expanded={dropdownOpen}
			>
				<div className="bg-gray-100 rounded-full" style={{ padding: "7px" }}>
					<AiOutlineUser size={21} />
				</div>
				<div className="flex items-center truncate">
					<svg
						className="w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-400"
						viewBox="0 0 12 12"
					>
						<path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
					</svg>
				</div>
			</button>

			<Transition
				className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
				show={dropdownOpen}
				enter="transition ease-out duration-200 transform"
				enterStart="opacity-0 -translate-y-2"
				enterEnd="opacity-100 translate-y-0"
				leave="transition ease-out duration-200"
				leaveStart="opacity-100"
				leaveEnd="opacity-0"
				appear={undefined}
			>
				<div
					ref={dropdown}
					onFocus={() => setDropdownOpen(true)}
					onBlur={() => setDropdownOpen(false)}
				>
					<div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 w-36">
						<div className="font-medium text-gray-800">CertWise User</div>
						<div className="text-xs text-gray-500 italic">Administrator</div>
					</div>
					<ul>
						<li>
							<Link
								className="font-medium text-sm text-indigo-500 hover:text-indigo-800 hover:bg-gray-200  flex items-center py-1 px-3"
								to="/"
								onClick={() => setDropdownOpen(!dropdownOpen)}
							>
								Settings
							</Link>
						</li>
						<li>
							<Link
								className="font-medium text-sm text-indigo-500 hover:text-indigo-800 hover:bg-gray-200  flex items-center py-1 px-3"
								to="/"
								onClick={() => signOutFunction()}
							>
								Sign Out
							</Link>
						</li>
					</ul>
				</div>
			</Transition>
		</div>
	);
}

export default UserMenu;
