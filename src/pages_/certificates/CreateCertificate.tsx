import { useState } from "react";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import CreateCertificateForm from "../../partials_/certificates/CreateCertificateForm";

function CreateCertificate() {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

	return (
		<div>
			<div className="flex h-screen overflow-hidden">
				{/* Sidebar */}
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				{/* Content area */}
				<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
					{/*  Site header */}
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					<CreateCertificateForm />
				</div>
			</div>
		</div>
	);
}

export default CreateCertificate;
