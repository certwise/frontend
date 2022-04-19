import { useContext, useEffect, useState } from "react";
import SetCreateCertificateType from "../../../partials/certificates/Create/SetCreateCertificateType";
import TemplatesGrid from "../../../partials/certificates/Create/TemplatesGrid";
import Header from "../../../partials/Header";
import Sidebar from "../../../partials/Sidebar";
import { actions, Context } from "../../../store";
import Page2 from "./2";
import Page3 from "./3";
import { useGetByOrganization as useGetTemplates } from "../../../api/template";
import { useGetByOrganization as useGetRecipients } from "../../../api/recipient";
import EmptyState from "../../../partials/EmptyState";
import { useHistory } from "react-router-dom";
import Loader from "../../../partials/Loader";
function Create() {
	const { store, dispatch } = useContext(Context);
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
	const activePageClassName = "bg-blue-500 text-white";
	const nonActivePageClassName = "bg-gray-200 text-gray-600";
	const activePage = store.certificates.createCertificate.page;
	const templates = useGetTemplates(store.user.organization);
	const recipients = useGetRecipients(store.user.organization);
	const history = useHistory();
	const [page, setPage] = useState<number>(1);
	useEffect(() => {
		setPage((p) => Math.max(store.certificates.createCertificate.page, p));
	}, [store.certificates.createCertificate.page]);
	return (
		<div>
			<div className="flex h-screen overflow-hidden">
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					{(templates.isLoading || recipients.isLoading) && (
						<div className="my-auto">
							<Loader />
						</div>
					)}
					{!templates.isLoading &&
						!recipients.isLoading &&
						templates.data?.data.length === 0 &&
						recipients.data?.data.length === 0 && (
							<EmptyState
								title={"No templates and Recipients."}
								description="Create a template and then add recipients to create a certificate."
								button="Get Started By Adding Recipients"
								onClick={(e: any) => {
									e.stopPropagation();
									history.push("/recipients/list");
								}}
							/>
						)}
					{!templates.isLoading &&
						!recipients.isLoading &&
						templates.data?.data.length > 0 &&
						recipients.data?.data.length === 0 && (
							<EmptyState
								title={"No  Recipients."}
								description="Add recipients to create a certificate."
								button="Go to Recipients"
								onClick={(e: any) => {
									e.stopPropagation();
									history.push("/recipients/list");
								}}
							/>
						)}
					{!templates.isLoading &&
						!recipients.isLoading &&
						templates.data?.data.length === 0 &&
						recipients.data?.data.length > 0 && (
							<EmptyState
								title={"No templates."}
								description="Create a template to create a certificate."
								button="Create Template"
								onClick={(e: any) => {
									e.stopPropagation();
									history.push("/recipients/list");
								}}
							/>
						)}
					{!templates.isLoading &&
						!recipients.isLoading &&
						templates.data?.data.length > 0 &&
						recipients.data?.data.length > 0 && (
							<>
								<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ">
									<div className="max-w-xl ml-5 w-full">
										<div className="relative">
											<div
												className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-gray-200"
												aria-hidden="true"
											></div>
											<ul className="relative flex justify-between w-full">
												<li>
													<button
														onClick={() => {
															if (page > 0)
																dispatch(actions.certificate.setCreatePage(1));
														}}
														className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${
															activePage === 1
																? activePageClassName
																: nonActivePageClassName
														}`}
													>
														1
													</button>
												</li>
												<li>
													<button
														onClick={() => {
															if (page > 1) {
																if (page < 3) setPage(2);
																dispatch(actions.certificate.setCreatePage(2));
															}
														}}
														className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${
															activePage === 2
																? activePageClassName
																: nonActivePageClassName
														}`}
													>
														2
													</button>
												</li>
												<li>
													<button
														onClick={() => {
															if (page > 2)
																dispatch(actions.certificate.setCreatePage(3));
														}}
														className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${
															activePage === 3
																? activePageClassName
																: nonActivePageClassName
														}`}
													>
														3
													</button>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
									{store.certificates.createCertificate.page === 1 && (
										<>
											<TemplatesGrid />
											{store.certificates.createCertificate.selectedTemplate !==
												undefined && <SetCreateCertificateType />}
										</>
									)}
									{store.certificates.createCertificate.page === 2 && (
										<>
											<Page2 />
										</>
									)}
									{store.certificates.createCertificate.page === 3 && (
										<>
											<Page3 />
										</>
									)}
								</div>
							</>
						)}
					{/*  Page number  end*/}
				</div>
			</div>
		</div>
	);
}

export default Create;
