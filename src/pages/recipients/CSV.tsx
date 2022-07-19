import papa from "papaparse";
import { useContext, useEffect, useMemo, useState } from "react";
import { GrDocumentCsv } from "react-icons/gr";
import Header from "../../partials/Header";
import CSVMapFields from "../../partials/recepients/CSVMapFields";
import CSVTable from "../../partials/recepients/CSVTable";
import RecipientsTableCSV from "../../partials/recepients/CSVRecipientsTable";
import Sidebar from "../../partials/Sidebar";
import { actions, Context } from "../../store";
import { CustomField, recipient } from "../../store/types";
import { useCreateBulk } from "../../api/recipient";
import { useHistory } from "react-router-dom";

function CSVRecipients() {
	const [sidebarOpen, setSidebarOpen] = useState<any>(false);
	const history = useHistory();
	const [file, setFile] = useState<any>(null);
	const [json, setJson] = useState<any>([]);
	const [map, setMap] = useState<Array<{ recipient: string; csv: string }>>([]);
	const { store, dispatch } = useContext(Context);
	const [recipients, setRecipients] = useState<recipient[]>([]);
	const createRecipients = useCreateBulk();
	useMemo(() => {
		if (file)
			papa.parse(file, {
				complete: (results: any) => {
					setJson(results.data);
				},
			});
	}, [file]);
	useEffect(() => {
		if (json.length > 0) {
			const recipientsTemp: recipient[] = [];
			const headings = json[0] as string[];
			console.log("Headings", headings);
			json.forEach((row: string[], index: number) => {
				if (index > 0 && row.length === headings.length) {
					const customFields: CustomField[] = [];
					let recipient: recipient = {
						name: "",
						email: "",
						createdAt: new Date(),
						customFields: [],
						organization: store.user.organization,
						groups: [],
						certificates: [],
					};
					map.forEach((mapping) => {
						const headingIndex = headings.indexOf(mapping.csv);
						if (mapping.recipient.toLowerCase() === "name") {
							if (!!row[headingIndex]) recipient.name = row[headingIndex];
							else
								dispatch(
									actions.toast.makeToast({
										message:
											"Name is empty for recipient at row " +
											(index + 1) +
											" of CSV file",
										type: "error",
										duration: "long",
									})
								);
						} else if (mapping.recipient.toLowerCase() === "email") {
							if (!!row[headingIndex]) recipient.email = row[headingIndex];
							else
								dispatch(
									actions.toast.makeToast({
										message:
											"Email is empty for recipient at row  " +
											(index + 1) +
											" of CSV file",
										type: "error",
										duration: "long",
									})
								);
						} else if (
							mapping.recipient.toLowerCase() !== "name" &&
							mapping.recipient.toLowerCase() !== "email"
						) {
							const name = mapping.recipient;
							const value = row[headingIndex];
							if (value) {
								customFields.push({
									name,
									value,
								});
							}
						} else alert("Empty field");
					});
					recipient.customFields = customFields;
					recipientsTemp.push(recipient);
				}
			});
			console.log("Recipients", recipientsTemp);
			setRecipients(recipientsTemp);
		}
	}, [map]);
	return (
		<>
			<div className="flex h-screen overflow-hidden">
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

					<main>
						<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
							{/* Page header */}
							<div className="sm:flex sm:justify-between sm:items-center mb-8">
								{/* Left: Title */}
								<div className="mb-4 sm:mb-0">
									<h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
										Import Recipients from CSV ✨
									</h1>
								</div>
							</div>
							<div>
								<form>
									<input
										type="file"
										name="file"
										id="file"
										className="hidden"
										accept=".csv"
										onChange={(e) => {
											if (e.target.files) setFile(e.target.files[0]);
										}}
									/>
									<label htmlFor="file">
										<div className="btn bg-blue-500 hover:bg-blue-600 text-white hover:cursor-pointer">
											<GrDocumentCsv className="mx-3" size={24} />
											<span className="mr-3">Import CSV file </span>
										</div>
										{file && (
											<span className="ml-5 text-blue-500 align-bottom font-bold text-lg">
												{file.name}{" "}
												<i className="font-light text-sm">
													{json.filter((c: any) => c.length === json[0].length)
														.length - 1}{" "}
													records
												</i>
											</span>
										)}
									</label>
								</form>
								{json.length > 0 && (
									<>
										<CSVTable
											key={"aeflriadlf"}
											columns={json[0]}
											data={json.slice(1, 6)}
										/>
										<CSVMapFields csvColumns={json[0]} setMap={setMap} />
										{recipients.length > 0 && (
											<>
												<RecipientsTableCSV
													recipients={recipients.slice(0, 5)}
												/>
												<button
													onClick={() => {
														createRecipients
															.mutateAsync(recipients)
															.then(() => {
																dispatch(
																	actions.toast.makeToast({
																		message: "Recipients created",
																		type: "success",
																		duration: "long",
																	})
																);
																setTimeout(
																	() => history.push("/recipients/list"),
																	2000
																);
															})
															.catch((e) => console.log(e));
													}}
													className="my-4 btn bg-blue-500 hover:bg-blue-600 text-white hover:cursor-pointer"
												>
													Create {recipients.length} recipients
												</button>
											</>
										)}
									</>
								)}
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	);
}

export default CSVRecipients;
