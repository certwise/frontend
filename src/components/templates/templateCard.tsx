import { getDownloadURL, getStorage, ref } from "@firebase/storage";
import React, { useState } from "react";
import moment from "moment";
import { deleteTemplate, renameTemplate } from "../../api/templates";
import Context from "../../store/context";
import { templateActions } from "../../store";
import { Link } from "react-router-dom";
import { template } from "../../store/templates/types";

type Props = {
	template: template;
	uid: string;
	id: string;
	type: "certificate" | "template";
};
function TemplateCard({ template, uid, id, type }: Props) {
	const [isRenaming, setisRenaming] = useState(false);
	const [name, setname] = useState(template.name);
	return (
		<>
			<div className="card shadow-lg border-2 border-gray-300 flex flex-row mt-5 mb-6">
				<div className="m-2 ">
					<SavedImage uid={uid} template={id} name={template.name} />
				</div>
				<div className="card-body place-items-center place-content-center">
					{!isRenaming ? (
						<div className="font-bold align-top text-md">
							{name}
							<button className="btn-xs" onClick={() => setisRenaming(true)}>
								{type !== "certificate" && (
									<img
										style={{ width: 15 }}
										className="align-baseline"
										alt="Rename"
										src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-edit-interface-kiranshastry-lineal-kiranshastry-2.png"
									/>
								)}
							</button>
						</div>
					) : (
						<div>
							<input
								className="input input-primary mb-1"
								type="text"
								defaultValue={name}
								onChange={(e) => setname(e.target.value)}
							/>
							<button
								className="btn-xs btn-primary ml-3 rounded"
								onClick={async () => {
									try {
										await renameTemplate(id, name);
										setisRenaming(false);
									} catch (e) {
										console.log(e);
									}
								}}
							>
								Rename
							</button>
							<button
								className="btn-xs btn-error ml-1 rounded"
								onClick={() => {
									setisRenaming(false);
									setname(template.name);
								}}
							>
								Cancel
							</button>
						</div>
					)}
					<div className="place-items-center place-content-center">
						<div>
							{type !== "certificate" ? (
								<Link
									className="btn-sm btn-primary m-1 p-2 mt-4 rounded w-5/6"
									to={
										"/template/" +
										template.name.toLowerCase().replace(/\s/g, "")
									}
								>
									Edit
								</Link>
							) : (
								<Link
									className="btn-sm btn-primary m-1 mt-3 rounded w-full"
									to={
										"/certificate/create/" +
										template.name.toLowerCase().replace(/\s/g, "")
									}
								>
									Create Certificate
								</Link>
							)}
						</div>
						<div
							data-tip={template.description}
							className="tooltip tooltip-right"
						>
							<button className="btn-xs btn-info m-1 rounded w-full">
								Description
							</button>
						</div>
					</div>
				</div>

				<div className="shadow stats">
					<div className="stat place-items-center place-content-center">
						<div className="stat-title">Number of Certificates</div>
						<div className="stat-value mb-5">
							{template.numberOfCertificates || 0}
						</div>
						<div className="stat-desc font-bold">
							Created at:{" "}
							{moment(template.createdAt).format("DD MMM YYYY HH:mm:ss")}
						</div>
					</div>

					<div className="stat place-items-center place-content-center">
						<div className="stat-title">Current Plan</div>
						<div className="stat-value text-success">Free tier</div>
						<div className="stat-desc text-success"></div>
					</div>
					{type !== "certificate" && (
						<div className="stat place-items-center place-content-center">
							<div
								className="btn btn-error"
								onClick={() => {
									deleteTemplate(id).then(() => window.location.reload());
								}}
							>
								Delete
							</div>
							<div className="stat-value text-error"></div>
							<div className="stat-desc text-error"></div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default TemplateCard;

const SavedImage = (props: any) => {
	const [loading, setLoading] = useState<any>(true);
	const { store, dispatch } = React.useContext(Context);
	const imgDef = new Image();
	const [img, setimg] = React.useState(imgDef);
	React.useEffect(() => {
		if (
			!store.templates.userTemplates.find((t) => t.id === props.template)?.image
		) {
			getDownloadURL(
				ref(
					getStorage(),
					`${props.uid}/templates/${props.template}/example/template_image.jpeg`
				)
			)
				.then((url) => {
					img.src = url;
					img.onload = () => {
						setTimeout(() => setLoading(false), 500);
						let userTemplates = store.templates.userTemplates;
						userTemplates.map((template) => {
							if (template.id === props.template) {
								template["image"] = img.src;
							}
							return template;
						});
						console.log("Then onLoad", store.templates.userTemplates);
						setimg(img);
						dispatch(templateActions.setUserTemplates(userTemplates));
					};
				})
				.catch(async () => {
					let def = await getDownloadURL(
						ref(getStorage(), `default_template_images/base.jpg`)
					);
					img.src = def;
					img.onload = () => {
						setTimeout(() => setLoading(false), 500);
						let userTemplates = store.templates.userTemplates;
						userTemplates.map((template) => {
							if (template.id === props.template) {
								template["image"] = img.src;
							}
							return template;
						});
						console.log("Catch onLoad", store.templates.userTemplates);
						setimg(img);
						dispatch(templateActions.setUserTemplates(userTemplates));
					};
				});
		} else {
			setLoading(false);
			setimg(
				store.templates.userTemplates.find((t) => t.id === props.template)
					?.image
			);
		}
	}, []);
	return (
		<div>
			{store.templates.userTemplates.find((i) => i.id === props.template)
				?.image ? (
				<div
					style={{ minHeight: window.innerHeight / 3.7 }}
					className="w-72 flex flex-row mt-5 mb-6"
				>
					<div className="flex align-center justify-center">
						<img
							className="object-scale-down"
							src={
								store.templates.userTemplates.find(
									(i) => i.id === props.template
								)?.image
							}
							alt={props.name}
						/>
					</div>
				</div>
			) : (
				<div
					style={{ minHeight: window.innerHeight / 3.7 }}
					className="w-72 flex flex-row mt-5 mb-6"
				>
					<div className="flex align-center justify-center">
						<button className="btn btn-primary btn-lg btn-circle loading m-5" />
					</div>
				</div>
			)}
		</div>
	);
};
