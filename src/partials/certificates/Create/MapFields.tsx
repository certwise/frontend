import { useEffect, useState } from "react";
import DropdownMapping from "./DropdownMapping";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { CustomField } from "../../../store/types";
function MapFields({
	recipientFields,
	selectedTemplateFields,
	setmap,
}: {
	recipientFields: CustomField[];
	selectedTemplateFields: CustomField[];
	setmap: (arg: any) => void;
}) {
	let mapInit: any = {};
	selectedTemplateFields.forEach((field: any) => {
		mapInit[field] = "";
	});
	const [map, setMap] = useState<any>();
	useEffect(() => setmap(() => map), [map, setmap]);
	return (
		<div>
			<div className="flex flex-row">
				<div className="w-full">
					<div className="flex flex-row ">
						<div className="text-blue-500 mt-5 font-bold w-full text-center">
							Template Variable
						</div>
						<div className="w-full text-blue-500 mt-5 ml-4 font-bold text-center">
							Recipient Data
						</div>
					</div>
					{selectedTemplateFields.map((field, i: number) => {
						return (
							<div key={i} className="flex flex-row ">
								<div className="btn border border-gray-200 form-input my-2 w-full text-center">
									{field.name}{" "}
								</div>
								<div className="w-full my-2 flex flex-row">
									<HiOutlineArrowNarrowRight size={24} className="mt-2 mx-2" />
									<div className="">
										<DropdownMapping
											fields={[
												...recipientFields,
												{ name: "name" },
												{ name: "email" },
												{ name: "| Custom value |", type: "custom" },
											]}
											setSelectedField={(value: string) => {
												setMap({ ...map, [field.name]: value });
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
