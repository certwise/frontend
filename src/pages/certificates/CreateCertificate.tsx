import { useContext, useEffect, useState } from "react";
import * as certificateQuery from "../../api/certificate";
import { useGetByOrganization } from "../../api/recipient";
import { useGet } from "../../api/organization";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import CreateCertificateForm from "../../partials/certificates/CreateCertificateForm";
import MapFields from "../../partials/certificates/MapFields";
import TemplatesGrid from "../../partials/certificates/TemplatesGrid";
import { actions, Context } from "../../store";
import {
	certificate,
	CustomField,
	group,
	organization,
	recipient,
	template,
} from "../../store/types";

function CreateCertificate() {
	const { store, dispatch } = useContext(Context);
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
	const [template, setTemplate] = useState<template>();
	const [recipient, setRecipient] = useState<recipient>();
	const [group, setGroup] = useState<group>();
	const [fields, setFields] = useState<CustomField[]>([]);
	const [map, setMap] = useState<any>();
	const [type, setType] = useState<any>();
	const organizationQuery = useGet(store.user.organization);
	const recipientQuery = useGetByOrganization(group?._id as string);
	const [recipients, setRecipients] = useState<recipient[]>(
		recipientQuery.data?.data
	);
	const [groupFields, setGroupFields] = useState<CustomField[]>(
		group?.customFields || []
	);
	const [organization, setOrganization] = useState<organization>(
		organizationQuery.data?.data
	);
	const createSingleCertificate = certificateQuery.useCreate();
	const createCertificatesMany = certificateQuery.useCreateMany();
	useEffect(() => {
		console.log(recipientQuery.data);
		setRecipients(recipientQuery.data?.data);
		setOrganization(organizationQuery.data?.data);
	}, [recipientQuery.data, organizationQuery.data, group]);
	useEffect(() => {
		if (recipient && map && type === "single") {
			setFields([]);
			const fields = Object.keys(map).map((key) => {
				if (map[key] === "name")
					return {
						name: key,
						value: recipient?.name,
					};
				if (map[key] === "email")
					return {
						name: key,
						value: recipient?.email,
					};
				return {
					name: key,
					value: recipient?.customFields.find((f) => f.name === map[key])
						?.value,
				};
			});
			setFields(fields);
		}
		if (map && type === "group") {
			setFields([]);
			Object.keys(map).forEach((key: any) => {
				setFields((prevState) => {
					if (prevState) return [...prevState, { name: key, value: map[key] }];
					else return [{ name: key, value: map[key] }];
				});
			});
		}
	}, [map]);

	useEffect(() => {
		console.log("Group");
		if (group?.customFields)
			setGroupFields(
				[...group?.customFields, ...organization.customFields] || []
			);
		organizationQuery.refetch();
		recipientQuery.refetch();
	}, [group]);

	const [templateFields, setTemplateFields] = useState<string[]>([]);
	useEffect(() => {
		setTemplateFields([]);
		template?.templateFields.forEach((fields) => {
			setTemplateFields((prevState) => [...prevState, fields.name]);
		});
	}, [template]);

	templateFields.map((field) => field.trim());

	const createCertificate = (e: any) => {
		e.preventDefault();
		if (template && recipient && type === "single") {
			const certificate: certificate = {
				issuer: template.createdBy,
				templateId: template._id as string,
				issueDate: false,
				createdAt: new Date(),
				lastUpdated: new Date(),
				validTill: false,
				recipient: recipient._id as string,
				fields: fields,
				organization: store.user.organization,
				isIssued: false,
				group: false,
				isRevoked: false,
			};
			createSingleCertificate.mutate(certificate);
		}
		if (recipients && template && group && type === "group") {
			const certificates: certificate[] = [];
			console.log("Recipients:", recipients);
			for (const recipient of recipients) {
				const resultFields: CustomField[] = [];
				for (const field of fields) {
					if (field.value === "name") {
						resultFields.push({
							name: field.name,
							value: recipient.name,
						});
					} else if (field.value === "email") {
						resultFields.push({
							name: field.name,
							value: recipient.email,
						});
					} else {
						resultFields.push({
							name: field.name,
							value: recipient.customFields.find((f) => f.name === field.value)
								?.value,
						});
					}
				}
				const certificate: certificate = {
					issuer: template.createdBy,
					templateId: template._id as string,
					issueDate: false,
					createdAt: new Date(),
					lastUpdated: new Date(),
					validTill: false,
					recipient: recipient._id as string,
					fields: resultFields,
					organization: store.user.organization,
					isIssued: false,
					group: false,
					isRevoked: false,
				};
				certificates.push(certificate);
				console.log(certificate);
				console.log(certificate.fields);
			}
			console.log("Certififcates", certificates);
			if (certificates.length > 0) createCertificatesMany.mutate(certificates);
			else
				dispatch(
					actions.toast.makeToast({
						message: "No recipients in group",
						type: "error",
						duration: "long",
					})
				);
		}
	};
	useEffect(() => {
		if (createSingleCertificate.isSuccess) {
			createSingleCertificate.reset();
			alert("Certificate created successfully");
		}
		if (createCertificatesMany.isSuccess) {
			createCertificatesMany.reset();
			alert("Certificates created successfully");
		}
	}, [createSingleCertificate, createCertificatesMany]);

	return (
		<div>
			{!recipientQuery.isLoading && !organizationQuery.isLoading && (
				<div className="flex h-screen overflow-hidden">
					{/* Sidebar */}
					<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					{/* Content area */}
					<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
						{/*  Site header */}
						<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
						<div className="m-5">
							<h1 className="font-bold text-3xl mb-5">Create Certificate</h1>
							<TemplatesGrid />
							{template && (
								<CreateCertificateForm
									setType={setType}
									setRecipient={setRecipient}
									setGroup={setGroup}
								/>
							)}
							{type === "single" && template && recipient && (
								<div>
									{template.templateFields.length > 0 && (
										<>
											<div className="text-xl font-bold">Set Fields</div>
											<p className="max-w-lg text-sm">
												Lorem ipsum dolor sit amet consectetur adipisicing elit.
												Dolore sit nulla sint fugit quo repellendus voluptatum
												suscipit, quisquam maxime expedita aut adipisci ullam.
												Certs
											</p>
											{/* <MapFields
												recipientFields={recipient.customFields}
												selectedTemplateFields={templateFields}
												setmap={setMap}
											/> */}
										</>
									)}
									{!(
										createCertificatesMany.isLoading ||
										createSingleCertificate.isLoading
									) &&
										template.templateFields.length > 0 &&
										map && (
											<button
												className="btn bg-blue-500 text-white"
												onClick={(e) => {
													createCertificate(e);
												}}
											>
												Create Certificate
											</button>
										)}
									{!(
										createCertificatesMany.isLoading ||
										createSingleCertificate.isLoading
									) &&
										template.templateFields.length === 0 && (
											<button
												className="btn bg-blue-500 text-white mb-5"
												onClick={(e) => {
													createCertificate(e);
												}}
											>
												Create Certificate
											</button>
										)}
									{(createCertificatesMany.isLoading ||
										createSingleCertificate.isLoading) && (
										<button className="btn bg-blue-200 text-white mb-5">
											Creating Certificate...
										</button>
									)}
								</div>
							)}
							{type === "group" && template && group && (
								<div>
									{template.templateFields.length > 0 && (
										<>
											<div className="text-xl font-bold">Set Fields</div>
											<p className="max-w-lg text-sm">
												Lorem ipsum dolor sit amet consectetur adipisicing elit.
												Dolore sit nulla sint fugit quo repellendus voluptatum
												suscipit, quisquam maxime expedita aut adipisci ullam.
											</p>
											{/* <MapFields
												recipientFields={groupFields}
												selectedTemplateFields={templateFields}
												setmap={setMap}
											/> */}
										</>
									)}
									{!(
										createCertificatesMany.isLoading ||
										createSingleCertificate.isLoading
									) &&
										template.templateFields.length > 0 &&
										map && (
											<button
												className="btn bg-blue-500 text-white mb-5"
												onClick={(e) => {
													createCertificate(e);
												}}
											>
												Create Certificates
											</button>
										)}
									{!(
										createCertificatesMany.isLoading ||
										createSingleCertificate.isLoading
									) &&
										template.templateFields.length === 0 && (
											<button
												className="btn bg-blue-500 text-white mb-5"
												onClick={(e) => {
													createCertificate(e);
												}}
											>
												Create Certificates
											</button>
										)}
									{(createCertificatesMany.isLoading ||
										createSingleCertificate.isLoading) && (
										<button className="btn bg-blue-200 text-white mb-5">
											Creating Certificates...
										</button>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default CreateCertificate;
