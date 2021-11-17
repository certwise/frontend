import { useEffect, useState } from "react";
import DropdownMapping from "./DropdownMapping";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
function MapFields({ certificateFields, selectedTemplateFields, setmap }: any) {
	let mapInit: any = {};
	selectedTemplateFields.map((field: any, i: number) => {
		mapInit[field] = "";
	});
	const [map, setMap] = useState<any>();
	useEffect(() => setmap(map), [map]);
	return (
		<div>
			<div className="flex flex-row max-w-xl">
				<div className="w-full">
					{selectedTemplateFields.map((field: any) => {
						return (
							<div className="flex flex-row ">
								<div className="btn border border-gray-200 form-input my-2  w-full text-center">
									{field}{" "}
								</div>
								<div className="w-full my-2 flex flex-row">
									<HiOutlineArrowNarrowRight size={24} className="mt-2 mx-2" />
									<div className="">
										<DropdownMapping
											fields={certificateFields}
											setSelectedField={(value: any) =>
												setMap({ ...map, [field]: value })
											}
										/>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default MapFields;
