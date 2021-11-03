import React, { useEffect, useState } from "react";
import axios from "axios";
import * as api from "../../api/templates";
import { env } from "../../config";
import Context from "../../store/context";
import { useParams } from "react-router-dom";
import { certificate, recipient } from "../../store/certificates/types";
import { fields, template } from "../../store/templates/types";

function CreateCertificate() {
	const { store }: any = React.useContext(Context);
	const [fields, setfields] = useState<Array<fields>>([]);
	const [receiver, setReceiver] = useState<recipient>();
	const [template, setTemplate] = useState<template>();
	const [templateFields, setTemplateFields] = useState<Array<string>>();
	const { name } = useParams<any>();
	useEffect(() => {
		api
			.getTemplateByName(name, store.user.uid)
			.then((res: any) => {
				setTemplate(res);
				console.log("Template:", res);
				let url = `${env.url}/template/fields/${res.id}`;
				return axios.get(url);
			})
			.then((fields) => {
				console.log("axios data:", fields);
				setTemplateFields(fields.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const createCertificate = (e: any) => {
		e.preventDefault();
		if (template !== undefined && receiver !== undefined) {
			let req: certificate = {
				issuerId: store.user.uid,
				templateId: template.id,
				issueDate: false,
				createdAt: new Date(),
				lastUpdated: new Date(),
				validTill: true,
				recipient: {
					name: receiver.name,
					email: receiver.email,
					certificates: [],
				},
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
		<div className="m-4">
			{templateFields && template && (
				<div>
					<div className="text-3xl text-primary mb-4 font-bold">
						{template.name}
					</div>
					<div className="text-xl font-bold">Create Single Certificate</div>
					<form className="mt-5 p-2 border-2 border-primary ">
						<div className="text-3xl font-bold p-2 mt-4">
							Fill fields of {template.name || name}:
						</div>
						<div className="m-2  ">
							<div className="text-xl font-bold ml-1 text-primary">
								<label className="w-5">Name of receiver</label>
							</div>
							<input
								className="input  border-2 border-primary w-2/5"
								type="text"
								placeholder="Name"
								onChange={(e) => {
									setReceiver(
										receiver
											? { ...receiver, name: e.target.value }
											: { name: e.target.value, email: "" }
									);
								}}
							/>
						</div>
						<div className="m-2  ">
							<div className="text-xl font-bold ml-1 ">
								<label className="w-5">Email of receiver</label>
							</div>
							<input
								className=" input  border-2 border-primary w-2/5"
								type="email"
								placeholder="Email"
								onChange={(e) => {
									setReceiver(
										receiver
											? { ...receiver, email: e.target.value }
											: { name: "", email: e.target.value }
									);
								}}
							/>
						</div>
						{templateFields.map((field) => {
							return (
								<div className="m-2 " key={field}>
									<div className="text-xl font-bold ml-1 text-primary">
										<label className="w-screen">{field}</label>
									</div>
									<input
										className=" input  border-2 border-primary w-2/5"
										type="text"
										placeholder={field}
										onChange={(e) => {
											let f = fields;
											let x = f.find((i) => i.name === field);
											if (x !== undefined) {
												x.value = e.target.value;
												f.map((i) => {
													if (i.name === x?.name) {
														return x;
													} else return i;
												});
											} else {
												f.push({ name: field, value: e.target.value });
											}
											setfields(f);
										}}
									/>
								</div>
							);
						})}
						<button
							className="ml-2 mt-5 btn btn-primary"
							onClick={(e) => createCertificate(e)}
						>
							Create Single certificate |
						</button>
					</form>
					<div>
						<div className="mt-5 text-xl font-bold">
							Create Many Certificates
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default CreateCertificate;
