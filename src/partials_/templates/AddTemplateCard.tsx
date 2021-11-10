import { useState } from "react";
import { Redirect } from "react-router-dom";

function AddTemplateCard() {
	const [redirect, setredirect] = useState(false);
	if (redirect) {
		return <Redirect push to="/template/create" />;
	}
	return (
		<>
			{/* Card 1 */}
			<div
				style={{ minHeight: "300px" }}
				className="col-span-full sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-3 bg-white shadow-lg rounded-sm border border-gray-200 overflow-hidden 
                hover:bg-gray-50 hover:cursor-pointer
                "
				aria-controls="basic-modal"
				onClick={(e) => {
					setredirect(true);
				}}
			>
				<div className="h-full flex justify-items-center  items-center">
					<div className="text-xl text-center w-full">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler w-full icon-tabler-plus"
							width="44"
							height="44"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="#2c3e50"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<line x1="12" y1="5" x2="12" y2="19" />
							<line x1="5" y1="12" x2="19" y2="12" />
						</svg>
					</div>
				</div>
			</div>
		</>
	);
}

export default AddTemplateCard;
