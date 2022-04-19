import { Link } from "react-router-dom";
import {
	useGetDefaultBaseImage,
	useGetNumberOfCertificateInTemplate,
	useGetSavedImage,
} from "../../api/template";
import Tooltip from "../Tooltip";
import { template } from "../../store/types";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { MdOutlineDescription } from "react-icons/md";
import { GrCertificate } from "react-icons/gr";
type templateCardProps = {
	template: template;
};
function TemplateCard({ template }: templateCardProps) {
	const { data, isLoading, isError } = useGetSavedImage(
		template._id as string,
		template.organization
	);
	const defaultImage = useGetDefaultBaseImage();
	const numberOfCertificates = useGetNumberOfCertificateInTemplate(
		template._id || ""
	);
	return (
		<>
			{/* Card 1 */}
			<div
				className="xs:container col-span-full sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-3 
			bg-white shadow-xl rounded-sm border border-gray-300 overflow-hidden"
			>
				<div className="flex flex-col h-full">
					{/* Image */}
					{(defaultImage.isLoading || isLoading) && (
						<div style={{ height: "210px" }}>
							<div className="animate-pulse w-full h-full">
								<div className="bg-blue-100 p-6 h-full w-full flex justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-photo  mt-6"
										width="100"
										height="100"
										viewBox="0 0 24 24"
										strokeWidth="1"
										stroke="#222"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<line x1="15" y1="8" x2="15.01" y2="8" />
										<rect x="4" y="4" width="16" height="16" rx="3" />
										<path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" />
										<path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" />
									</svg>
								</div>
							</div>
						</div>
					)}
					{!isLoading && !defaultImage.isLoading && data && (
						<div className="border-b-2 border-gray-300 p-1 bg-blue-100 flex justify-center">
							<img
								className=""
								src={data as any}
								style={{
									height: "200px",
									objectFit: "scale-down",
								}}
								alt="Template"
							/>
						</div>
					)}
					{!isLoading && !defaultImage.isLoading && isError && (
						<div className="border-b-2 border-gray-300 p-1 bg-blue-100 flex justify-center">
							<img
								className=""
								src={defaultImage.data as any}
								style={{
									height: "200px",
									objectFit: "scale-down",
								}}
								alt="Template"
							/>
						</div>
					)}

					<div className="flex-grow flex flex-col p-5">
						<div className="flex-grow">
							<div className="flex flex-row  text-sm text-gray-900">
								<header className="mb-1">
									<h3 className="text-lg  text-gray-800 font-semibold">
										{template.name}{" "}
									</h3>
									<div className="mt-3 flex">
										<span className="flex">
											<Tooltip
												position="right"
												bg="dark"
												size="sm"
												name={
													<div
														className="font-bold inline-flex text-xs bg-blue-100 text-blue-600 rounded-full
													 text-center mr-4 px-3 py-1 "
													>
														<GrCertificate className="text-blue-500 mr-2 w-4 h-4" />{" "}
														{numberOfCertificates.data?.data.created}
													</div>
												}
											>
												<div className="text-white text-xs">
													There are {numberOfCertificates.data?.data.created}{" "}
													certificates created with this template.
												</div>
											</Tooltip>
										</span>
										<span className="flex">
											<Tooltip
												position="bottom"
												bg="dark"
												size="sm"
												name={
													<div
														className="ml-3 font-bold inline-flex text-xs bg-green-100 text-green-600
													 rounded-full text-center mr-4 px-3 py-1 "
													>
														<GrCertificate className="text-green-500 w-4 h-4 mr-2" />{" "}
														{numberOfCertificates.data?.data.issued}
													</div>
												}
											>
												<div className="text-white text-xs">
													There are {numberOfCertificates.data?.data.issued}{" "}
													certificates issued with this template.
												</div>
											</Tooltip>
										</span>
										<span className="flex">
											<Tooltip
												position="bottom"
												bg="dark"
												size="sm"
												name={
													<div
														className="ml-3 font-bold inline-flex text-xs bg-yellow-100 text-yellow-600
													 rounded-full text-center mr-4 px-3 py-1 "
													>
														<GrCertificate className="text-yellow-500 w-4 h-4 mr-2" />{" "}
														{numberOfCertificates.data?.data.revoked}
													</div>
												}
											>
												<div className="text-white text-xs">
													There are {numberOfCertificates.data?.data.issued}{" "}
													certificates revoked with this template.
												</div>
											</Tooltip>
										</span>
									</div>
								</header>
							</div>

							<ul className="text-sm space-y-3 mb-2">
								<li className="flex pt-5">
									<Tooltip
										position="right"
										bg="dark"
										size="sm"
										name={
											<MdOutlineDescription className="w-5 h-5 fill-current text-gray-500 flex-shrink-0 mr-3 mt-1" />
										}
									>
										<span className="text-white text-xs">
											Description of this template
										</span>
									</Tooltip>
									<div>
										<div className="text-xs font mt-1">
											{truncate(template.description, 120)}
										</div>
									</div>
								</li>
							</ul>
						</div>

						<div>
							<Link
								className="btn btn-xs mt-2 px-3 bg-blue-500 hover:bg-blue-600 text-xs text-white"
								to={"/template/view/" + template._id}
							>
								Go to template{" "}
								<HiOutlineArrowNarrowRight
									size={20}
									className="mt-0.5 ml-1 text-white font-bold"
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default TemplateCard;

export const truncate = (input: string, length: number) =>
	input.length > length ? `${input.substring(0, length)}...` : input;
