import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useCreateCertificate } from "../../api/certificateQueries";
import {
	useGetAllRecipients,
	useGetInstitution,
} from "../../api/recipientQueries";
import { env } from "../../config";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import CreateCertificateForm from "../../partials_/certificates/CreateCertificateForm";
import MapFields from "../../partials_/certificates/MapFields";
import TemplatesGrid from "../../partials_/certificates/TemplatesGrid";
import Context from "../../store/context";

function CreateCertificate() {
	const { store, dispatch } = useContext(Context);
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
	const [template, setTemplate] = useState<any>();
	const [recipient, setRecipient] = useState<any>();
	const [group, setGroup] = useState<any>();
	const [fields, setFields] = useState<any>([]);
	const [map, setMap] = useState<any>();
	const [type, setType] = useState<any>();
	const [groupFields, setGroupFields] = useState<any>(group);
	const institution = useGetInstitution(store.user.institution);
	const createCertificateMutation = useCreateCertificate();
	const {
		data: recipients,
		isLoading,
		isError,
	} = useGetAllRecipients(group?.recipients);
	useEffect(() => {
		setFields([]);
		if (map && type === "single") {
			setFields(undefined);
			Object.keys(map).forEach((key: any) => {
				setFields((prevState: any) => {
					if (prevState)
						return [...prevState, { name: key, value: recipient[map[key]] }];
					else return [{ name: key, value: recipient[map[key]] }];
				});
			});
		}
		if (map && type === "group") {
			setFields(undefined);
			Object.keys(map).forEach((key: any, i: number) => {
				setFields((prevState: any) => {
					if (prevState)
						return [...prevState, { name: key, value: groupFields[i] }];
					else return [{ name: key, value: groupFields[i] }];
				});
			});
		}
	}, [map]);
	useEffect(() => {
		const fieldss = ["name", "email"];
		if (group) {
			group.customFields.forEach((field: any) => fieldss.push(field.name));
			institution.data?.data.customFields.forEach((field: any) =>
				fieldss.push(field.name)
			);
		}
		setGroupFields(fieldss);
	}, [group]);
	const templateFields: any = [];
	template?.canvas.items.map((x: any) => {
		if (!x.isConstant) {
			templateFields.push(x.name);
		} else return null;
	});
	const createCertificate = (e: any) => {
		e.preventDefault();
		if (template && recipient && type === "single") {
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
		if (template && group && type === "group") {
			console.log("grouppppppppp:", recipients);
			for (const i in recipients) {
				const x: any = i;
				const rec: any = { ...recipients[x] };
				console.log("recipient", rec);
				const f: any = [];
				for (let field in fields) {
					const r = fields[field];
					console.log("field", fields[field]);
					console.log("r", rec.data[r.value]);
					f.push({ name: fields[field].name, value: rec.data[r.value] });
				}
				console.log("user", f);
				let req: any = {
					issuerId: template.uid,
					templateId: template.id,
					issueDate: false,
					createdAt: new Date(),
					lastUpdated: new Date(),
					validTill: true,
					recipient: rec.data["id"],
					fields: f,
				};
				console.log("create certificate:", req);
				createCertificateMutation.mutate(req);
			}
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
						{template && (
							<CreateCertificateForm
								setType={setType}
								setRecipient={setRecipient}
								setMap={setMap}
								setGroup={setGroup}
							/>
						)}
						{type === "single" && template && recipient && (
							<div>
								<div className="text-xl font-bold">Set Fields</div>
								<p className="max-w-lg text-sm">
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Dolore sit nulla sint fugit quo repellendus voluptatum
									suscipit, quisquam maxime expedita aut adipisci ullam. Certs
								</p>
								<MapFields
									recipientFields={Object.keys(recipient)}
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
						{type === "group" && template && group && (
							<div>
								<div className="text-xl font-bold">Set Fields</div>
								<p className="max-w-lg text-sm">
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Dolore sit nulla sint fugit quo repellendus voluptatum
									suscipit, quisquam maxime expedita aut adipisci ullam.
								</p>
								<MapFields
									recipientFields={groupFields}
									selectedTemplateFields={templateFields}
									setGroup={setGroup}
									setmap={setMap}
								/>
								{map && (
									<button
										className="btn bg-blue-500 text-white mb-5"
										onClick={(e) => {
											createCertificate(e);
										}}
									>
										Create Certificates
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
