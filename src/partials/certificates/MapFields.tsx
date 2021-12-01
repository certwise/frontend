import { useEffect, useState } from "react";
import DropdownMapping from "./DropdownMapping";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { CustomField } from "../../store/types";
function MapFields({
	recipientFields,
	selectedTemplateFields,
	setmap,
}: {
	recipientFields: CustomField[];
	selectedTemplateFields: string[];
	setmap: (arg: any) => void;
}) {
	let mapInit: any = {};
	selectedTemplateFields.forEach((field: any) => {
		mapInit[field] = "";
	});
	const [map, setMap] = useState<any>();
	useEffect(() => setmap(map), [map]);
	return (
		<div>
			<div className="flex flex-row max-w-xl">
				<div className="w-full">
					{selectedTemplateFields.map((field, i: number) => {
						return (
							<div key={i} className="flex flex-row ">
								<div className="btn border border-gray-200 form-input my-2  w-full text-center">
									{field}{" "}
								</div>
								<div className="w-full my-2 flex flex-row">
									<HiOutlineArrowNarrowRight size={24} className="mt-2 mx-2" />
									<div className="">
										<DropdownMapping
											fields={[
												...recipientFields,
												{ name: "name" },
												{ name: "email" },
												{ name: "Custom value", type: "custom" },
											]}
											setSelectedField={(value: string) => {
												setMap({ ...map, [field.replace(/ /g, "")]: value });
											}}
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
