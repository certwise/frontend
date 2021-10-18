import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CreatedCertedficates from "./createdCerts";
import UserTemplates from "./userTemplates.js";
function Certificate() {
	let rootElement: any = document.getElementById("root");
	Modal.setAppElement(rootElement);
	const [page, setPage] = useState(1);

	return (
		<div className="p-4">
			{page && (
				<div className="flex flex-row">
					<div style={{ zIndex: 0 }} className="tabs">
						<div
							onClick={() => setPage(1)}
							className={`tab tab-lg  font-bold tab-lifted  ${
								page == 1 ? "tab-active" : ""
							}`}
						>
							Your Certificates
						</div>
						<div
							onClick={() => setPage(2)}
							className={`tab tab-lg  font-bold tab-lifted  ${
								page == 2 ? "tab-active" : ""
							}`}
						>
							Create Certificates
						</div>
					</div>
				</div>
			)}
			{page === 1 && <CreatedCertedficates />}
			{page === 2 && <UserTemplates />}
		</div>
	);
}

export default Certificate;
