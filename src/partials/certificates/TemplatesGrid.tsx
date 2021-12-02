import { useContext, useEffect, useState } from "react";
import { useGetByOrganization } from "../../api/template";
import DropdownTemplate from "./DropDownTemplates";
import TemplateCard from "./TemplateCard";
import { actions, Context } from "../../store";

function TemplatesGrid() {
	const { store, dispatch } = useContext(Context);
	const { isLoading, data } = useGetByOrganization(store.user.organization);
	const [togglePreview, setTogglePreview] = useState(true);
	const selectedTemplate =
		store.certificates.createCertificate.selectedTemplate;
	return (
		<>
			<h1 className="font-bold text-xl mb-2">Choose a template</h1>
			<div className="text-sm mb-3">
				Choose a template to use for your certificate creation
			</div>
			<div className="max-w-xl">
				{isLoading && <p>Loading templates...</p>}
				{data && (
					<div className="flex flex-row">
						<DropdownTemplate templates={data?.data} />
					</div>
				)}
				{selectedTemplate && (
					<div className="flex flex-row">
						<div className="form-switch mt-2 pt-0.5 ml-1 text-sm flex-grow mb-3">
							Selected template:{" "}
							<span className="font-bold text-blue-600 text-lg">
								{" "}
								{selectedTemplate.name}
							</span>
						</div>
						<div className="form-switch mt-2">
							<input
								type="checkbox"
								id="switch-1"
								className="sr-only"
								checked={togglePreview}
								onChange={() => setTogglePreview((p) => !p)}
							/>
							<label className="bg-gray-400" htmlFor="switch-1">
								<span className="bg-white shadow-sm" aria-hidden="true"></span>
								<span className="sr-only">Preview</span>
							</label>
						</div>
					</div>
				)}
			</div>
			{selectedTemplate && togglePreview && (
				<>
					<div className="max-w-xl mb-6 ">
						<TemplateCard maxHeight={500} template={selectedTemplate} />
					</div>
				</>
			)}
		</>
	);
}

export default TemplatesGrid;
