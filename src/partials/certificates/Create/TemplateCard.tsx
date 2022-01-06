import {
	useGetDefaultBaseImage,
	useGetSavedImage,
} from "../../../api/template";
import { template } from "../../../store/types";

function TemplateCard({
	template,
	maxHeight,
}: {
	template: template;
	maxHeight: number;
}) {
	const { data, isLoading } = useGetSavedImage(
		template?._id as string,
		template?.organization
	);
	const defaultImage = useGetDefaultBaseImage();
	return (
		<>
			{/* Card 1 */}
			<div className="bg-white shadow-xl  border-gray-800 overflow-hidden rounded-sm">
				<div className="h-full ">
					{/* Image */}
					{!isLoading && !defaultImage.isLoading && (
						<div className="bg-gray-200 flex justify-center p-2">
							<img
								className="z-0 "
								src={(data as any) || (defaultImage.data as any)}
								style={{
									maxHeight: maxHeight,
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
