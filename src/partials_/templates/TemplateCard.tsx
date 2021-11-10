import moment from "moment";
import { Link } from "react-router-dom";
import { useGetTemplateImageQuery } from "../../api/templateQueries";
import { template } from "../../store/templates/types";

type templateCardProps = {
	template: template;
};
function TemplateCard({ template }: templateCardProps) {
	const { data, isLoading } = useGetTemplateImageQuery(
		template.id,
		template.uid
	);

	return (
		<>
			{/* Card 1 */}
			<div
				className="col-span-full sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-3 
			bg-white shadow-xl rounded-sm border border-gray-300 overflow-hidden"
			>
				<div className="flex flex-col h-full">
					{/* Image */}
					{!isLoading && (
						<div className="border-b-2 border-gray-300 p-2 bg-gray-50 flex justify-center">
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
					{isLoading && (
						<div style={{ height: "200px" }}>
							<div className="animate-pulse w-full h-full">
								<div className="bg-indigo-300 p-5 h-full w-full flex justify-center">
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

					{/* Title */}
					{/* Card Content */}
					<div className="flex-grow flex flex-col p-5">
						{/* Card body */}
						<div className="flex-grow">
							{/* Header */}
							<header className="mb-3">
								<h3 className="text-lg text-gray-800 font-semibold">
									{template.name}
								</h3>
							</header>

							{/* Features list */}
							<ul className="text-sm space-y-3 mb-2">
								<li className="flex">
									<svg
										className="w-4 h-4 fill-current text-gray-400 flex-shrink-0 mr-3 mt-1"
										viewBox="0 0 16 16"
									>
										<path d="M15.686 5.695L10.291.3c-.4-.4-.999-.4-1.399 0s-.4.999 0 1.399l.6.599-6.794 3.697-1-1c-.4-.399-.999-.399-1.398 0-.4.4-.4 1 0 1.4l1.498 1.498 2.398 2.398L.6 13.988 2 15.387l3.696-3.697 3.997 3.996c.5.5 1.199.2 1.398 0 .4-.4.4-.999 0-1.398l-.999-1 3.697-6.694.6.6c.599.6 1.199.2 1.398 0 .3-.4.3-1.1-.1-1.499zM8.493 11.79L4.196 7.494l6.695-3.697 1.298 1.299-3.696 6.694z" />
									</svg>
									<div>
										<div className="mr-6 font-bold text-xs">Created at:</div>
										<div className="text-xs  text-indigo-600">
											{moment(template.createdAt).format("LLL")}
										</div>
									</div>
								</li>
								<li className="flex ">
									<svg
										className="w-4 h-4 fill-current text-gray-400 flex-shrink-0 mr-3 mt-1"
										viewBox="0 0 16 16"
									>
										<path d="M15 15V5l-5-5H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h12c.6 0 1-.4 1-1zM3 2h6v4h4v8H3V2z" />
									</svg>
									<div>
										<div className="mr-5 font-bold text-xs">Last edited:</div>

										<div className="text-right text-xs text-indigo-600">
											{moment(template.updatedAt).format("LLL")}
										</div>
									</div>
								</li>

								<li className="flex ">
									<svg
										className="w-4 h-4 fill-current text-gray-400 flex-shrink-0 mr-3 mt-1"
										viewBox="0 0 16 16"
									>
										<path d="M7.3 8.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0zm0 6c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0zm-7-5c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0z" />
									</svg>
									{/* Rating */}
									<div className="flex items-center space-x-2 mr-2">
										{/* Number of certificates */}
										<div className="flex space-x-1 text-xs font-bold">
											Number of certificates
										</div>
									</div>
									<div className="ml-3 font-bold inline-flex text-sm bg-indigo-100 text-indigo-600 rounded-full text-center mr-4 px-4 py-0.5">
										{template.numberOfCertificates}
									</div>
								</li>
								{/* Description*/}
								<li className="flex ">
									<svg
										className="w-4 h-4 fill-current text-gray-400 flex-shrink-0 mr-3 mt-1"
										viewBox="0 0 16 16"
									>
										<path d="M7.3 8.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0zm0 6c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0zm-7-5c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0z" />
									</svg>
									<div>
										<div className=" mb-1 text-xs font-bold">Description :</div>
										<div className="mb-2 text-xs font">
											{template.description +
												"salksajlkjsadlkjlk aslkdj asldkj sadlkj"}
										</div>
									</div>
								</li>
							</ul>
						</div>
						{/* Card footer */}
						<div>
							<Link
								className="btn-sm mt-5 w-full bg-indigo-500 hover:bg-indigo-600 text-white"
								to={"/template/view/" + template.id}
							>
								Go to template
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default TemplateCard;
