import { useGetDefaultBaseImage, useGetSavedImage } from "../../api/template";
import { template } from "../../store/types";

function TemplateCard({ template }: { template: template }) {
	const { data, isLoading } = useGetSavedImage(
		template?._id as string,
		template?.organization
	);
	const defaultImage = useGetDefaultBaseImage();
	return (
		<>
			{/* Card 1 */}
			<div
				className="col-span-full sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-3
			bg-white shadow-xl  border-gray-800 overflow-hidden rounded-sm"
			>
				<div className="h-full ">
					{/* Image */}
					{!isLoading && !defaultImage.isLoading && (
						<div className="bg-gray-200 flex justify-center p-2">
							<img
								className="z-0"
								src={(data as any) || (defaultImage.data as any)}
								style={{
									height: "200px",
									objectFit: "scale-down",
									background: "rgba(0,0,0,0.5)",
								}}
								alt="Template"
							/>
						</div>
					)}
					{(!template || isLoading || defaultImage.isLoading) && (
						<div style={{ height: "200px" }}>
							<div className="animate-pulse w-full h-full">
								<div className="bg-blue-100 p-5 h-full w-full flex justify-center text-xs">
									<div className="animate-spin" />
									Loading preview...
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default TemplateCard;
