import axios from "axios";
import { useEffect, useState } from "react";
import { env } from "../../config";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import CreateCertificateForm from "../../partials_/certificates/CreateCertificateForm";
import MapFields from "../../partials_/certificates/MapFields";
import TemplatesGrid from "../../partials_/certificates/TemplatesGrid";

function CreateCertificate() {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
	const [template, setTemplate] = useState<any>();
	const [recipient, setRecipient] = useState<any>();
	const [fields, setFields] = useState<any>([]);
	const [map, setMap] = useState<any>();

	useEffect(() => {
		setFields([]);
		if (map)
			Object.keys(map).forEach((key: any) => {
				setFields((prevState: any) => {
					if (prevState) return [...prevState, { name: key, value: map[key] }];
					else return [{ name: key, value: recipient.map[key] }];
				});
			});
	}, [map]);
	const templateFields: any = [];
	template?.canvas.items.map((x: any) => {
		if (!x.isConstant) {
			templateFields.push(x.name);
		} else return null;
	});
	console.log("map parent", map);
	const createCertificate = (e: any) => {
		e.preventDefault();
		if (template && recipient) {
			let req: any = {
				issuerId: template.uid,
				templateId: template.id,
				issueDate: false,
				createdAt: new Date(),
				lastUpdated: new Date(),
				validTill: true,
				recipient: recipient.id,
				fields: fields,
			};
			console.log(req);
			let urls = `${env.url}/certificate/one/`;
			console.log("create certificate:", req);
			axios
				.post(urls, req)
				.then((res) => {
					console.log(res);
					alert("Certificate created");
				})
				.catch((err) => {
					console.log("Error:", err);
				});
		}
	};
	return (
		<div>
			<div className="flex h-screen overflow-hidden">
				{/* Sidebar */}
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				{/* Content area */}
				<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
					{/*  Site header */}
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					<div className="m-5">
						<h1 className="font-bold text-3xl mb-5">Create Certificate</h1>
						<TemplatesGrid setTemplate={setTemplate} />
						{template && <CreateCertificateForm setRecipient={setRecipient} />}
						{template && recipient && (
							<div>
								<div className="text-xl font-bold">Set Fields</div>
								<p className="max-w-lg text-sm">
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Dolore sit nulla sint fugit quo repellendus voluptatum
									suscipit, quisquam maxime expedita aut adipisci ullam.
								</p>
								<MapFields
									certificateFields={Object.keys(recipient)}
									selectedTemplateFields={templateFields}
									setmap={setMap}
								/>
								{map && (
									<button
										className="btn bg-blue-500 text-white"
										onClick={(e) => {
											createCertificate(e);
										}}
									>
										Create Certificate
									</button>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateCertificate;
