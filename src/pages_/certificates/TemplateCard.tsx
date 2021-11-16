import { Link } from "react-router-dom";
import { useGetTemplateImageQuery } from "../../api/templateQueries";

function TemplateCard({ template }: any) {
	const { data, isLoading } = useGetTemplateImageQuery(
		template?.id,
		template?.uid
	);

	return (
		<>
			{/* Card 1 */}
			<div
				className="col-span-full sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-3
			bg-white shadow-xl border border-gray-300 overflow-hidden rounded-xl"
			>
				<div className="flex flex-col h-full ">
					{/* Image */}
					{!isLoading && (
						<div className="border-b-2 border-gray-300 bg-gray-900 flex justify-center">
							<img
								className="z-0"
								src={data as any}
								style={{
									height: "200px",
									objectFit: "scale-down",
									background: "rgba(0,0,0,0.5)",
								}}
								alt="Template"
							/>
						</div>
					)}
					{(!template || isLoading) && (
						<div style={{ height: "200px" }}>
							<div className="animate-pulse w-full h-full">
								<div className="bg-blue-100 p-5 h-full w-full flex justify-center">
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
					<div
						style={{
							marginTop: "115px",
							height: 85,
							width: 190,
							background: "rgba(0, 0, 0, 0.7)",
							borderRadius: "5px",
						}}
						className="flex-grow flex flex-col p-5 absolute bg-gray-900 mt-auto blur-md"
					>
						{/* Card body */}

						<div className="flex mt-auto">
							{/* Header */}
							<header className="text-white font-bold">
								<h3 className="text-md font-semibold">{template.name}</h3>
							</header>

							{/* Features list */}
						</div>
						{/* Card footer */}
						<div>
							<Link
								className="text-sm  font-medium text-blue-400 hover:text-blue-300"
								to={"/template/view/" + template.id}
							>
								Select template -&gt;
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default TemplateCard;
