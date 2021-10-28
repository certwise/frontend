import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import * as api from "../../api/templates";
import Context from "../../store/context";
import Modal from "react-modal";
import moment from "moment";
import { template } from "../../store/templates/types";
import { certificate } from "../../store/certificates/types";

function CreatedCertificates() {
	Modal.setAppElement(document.getElementById("root") as any);
	const { store } = React.useContext(Context);
	const [currentCertificate, setCurrentCertificate] =
		useState<{ certificate: certificate; url: string }>();
	const [certificates, setCertificates] = useState<any>([]);
	const [templates, setTemplates] = useState<template[]>([]);
	const [templateQuery, setTemplateQuery] = useState<any>("");
	useEffect(() => {
		console.log(templates);
	});
	useEffect(() => {
		console.log("1100", store.user.uid);
		api.getCertificates(store.user.uid).then((res) => {
			if (res !== false) {
				res.sort((a: certificate, b: certificate) => {
					return b.templateId > a.templateId ? 1 : -1;
				});
				setCertificates(res);
				console.log("1100", res);
			}
		});
		api.getTemplates(store.user.uid).then((res) => {
			console.log("RESS", res);
			setTemplates(res);
		});
		return () => setCurrentCertificate(undefined);
	}, []);

	const setCurrentCertificateFunc = (cert: certificate) => {
		let imgRef = ref(getStorage(), cert.storageRef);
		getDownloadURL(imgRef).then((url) => {
			setCurrentCertificate({ certificate: cert, url: url });
			console.log("1100 url", url);
		});
	};
	return (
		<div>
			<div className="dropdown">
				<button className="btn btn-primary m-1 mt-4">Filter by Template</button>
				<ul className="p-2 border-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
					<li>
						<div
							className={`btn m-1 ${
								templateQuery === "" ? "btn-secondary" : "btn-ghost"
							}`}
							onClick={() => {
								setTemplateQuery("");
							}}
						>
							All Certificates
						</div>
					</li>
					{templates
						? templates.map((template: any, i: number) => {
								return (
									<li key={i}>
										<div
											className={`btn m-1 ${
												templateQuery === template.name
													? "btn-secondary"
													: "btn-ghost"
											}`}
											onClick={() => {
												setTemplateQuery(template.name);
											}}
										>
											{template.name}
										</div>
									</li>
								);
						  })
						: null}
				</ul>
			</div>
			<div className="mt-3 text-2xl ">
				Created Certificates:
				<div>
					<div className="overflow-x-auto">
						<table className="table w-full table-zebra ">
							<thead className="">
								<tr>
									<th style={{ zIndex: -50 }} className="text-gray-700">
										Receiver Name
									</th>
									<th className="text-gray-700">Receiver Email</th>
									<th className="text-gray-700">Issued on</th>
									<th className="text-gray-700">Template Name</th>
								</tr>
							</thead>
							<tbody>
								{templates &&
									certificates.map((cert: certificate, i: number) => {
										if (
											!templateQuery ||
											templates.find((item: any) => item.name === templateQuery)
												?.id === cert.templateId
										)
											return (
												<tr
													key={i}
													className={`${
														currentCertificate?.certificate.id === cert.id
															? "active"
															: "hover"
													}`}
												>
													{/* <td >{i + 1}</td> */}
													<td>
														<div>
															<button
																className="btn btn-primary w-2/3"
																onClick={() => {
																	setCurrentCertificateFunc(cert);
																	console.log(cert);
																}}
															>
																{cert.recipient.name}
															</button>
														</div>
													</td>
													<td className="text-sm  text">
														{cert.recipient.email}
													</td>
													<td className="text-sm font-bold text-accent">
														{moment(cert.createdAt).format(
															"DD MMM YYYY HH:mm:ss"
														)}
													</td>
													<td className="text-sm font-bold ">
														{
															templates.find(
																(item) => item.id === cert.templateId
															)?.name
															//  || (
															// 	<button className="btn btn-primary btn-lg btn-circle loading m-5"></button>
															// )
														}
													</td>
												</tr>
											);
										else return null;
									})}
							</tbody>
						</table>
					</div>
				</div>
				<div>
					<Modal
						onRequestClose={() => setCurrentCertificate(undefined)}
						isOpen={currentCertificate !== undefined}
						style={{
							overlay: {
								background: "rgba(0, 0, 0, 0.5)",
							},
							content: {
								background: "none",
								border: "none",
							},
						}}
					>
						{/* <button className='btn btn-error' onClick={() => {
                            setCurrentCertificate({ id: null })
                            console.log(currentCertificate)
                        }
                        }>Close</button> */}
						<div
							style={{
								width: window.innerWidth,
								height: window.innerHeight,
							}}
							onClick={() => {
								setCurrentCertificate(undefined);
							}}
							className="flex h-full flex-row justify-center"
						>
							<img
								onClick={() => setCurrentCertificate(undefined)}
								style={{ height: window.innerHeight * 0.8 }}
								src={currentCertificate?.url}
								alt="Certificate"
							/>
						</div>
					</Modal>
				</div>
			</div>
		</div>
	);
}

export default CreatedCertificates;
