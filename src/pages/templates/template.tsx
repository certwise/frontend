import { useEffect, useState, useContext } from "react";
import "../../App.css";
import Context from "../../store/context";
import * as api from "../../api/templates";
import { templateActions, setLoading as setAppLoading } from "../../store";
import CreateTemplate from "./createTemplate";
import TemplateCard from "./templateCard";
import { template } from "../../store/templates/types";
import { setPageTitle } from "../../store/actions";
function Template() {
	const { store, dispatch } = useContext(Context);
	const [templateNames, setTemplateNames] = useState([]);
	const [loading, setloading] = useState({
		templates: true,
		currentTemplate: false,
	});
	const [createTemplate, setCreateTemplate] = useState(false);
	const [templateQuery, setTemplateQuery] = useState("");
	useEffect(() => {
		dispatch(setPageTitle("Templates"));
		return () => dispatch(setPageTitle(""));
	}, []);
	useEffect(() => {
		if (loading.templates || loading.currentTemplate)
			dispatch(setAppLoading(true));
		else dispatch(setAppLoading(false));
	}, [loading]);

	useEffect(() => {
		if (store.templates.userTemplates.length === 0) {
			getUploadedTemplates()
				.then(() => {
					setloading({ ...loading, templates: false });
				})
				.catch((err) => {
					setloading({ ...loading, templates: false });
					console.log(err);
				});
		} else {
			setloading({ ...loading, templates: false });
		}
	}, []);

	const createTemplateForm = async () => {
		setCreateTemplate((prev) => !prev);
	};

	const getUploadedTemplates = () => {
		setloading({ ...loading, templates: true });
		return new Promise((resolve, reject) => {
			console.log("UID in templates", store.user.uid);
			api.getTemplates(store.user.uid).then((res) => {
				let names: any = [];
				res.forEach(async (template: template) => {
					names.push(template.name.toLowerCase().replace(/ /g, "-"));
				});
				res.sort((a, b) => {
					let da = a.name,
						db = b.name;
					if (da < db) {
						return -1;
					} else {
						return 1;
					}
				});
				setTemplateNames(names);
				dispatch(templateActions.setUserTemplates(res));
				console.log("Get templates():", res);
				setloading({ ...loading, templates: false });
				resolve(null);
			});
		});
	};
	return (
		<>
			<div>
				{store.app.isLoading ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: window.innerHeight * 0.9,
						}}
					>
						<button
							style={{ width: "200", height: "200" }}
							className="btn btn-xl btn-circle loading"
						></button>
					</div>
				) : (
					<>
						{/* <div className='mt-5 ml-5 text-4xl font-bold'>Templates</div> */}
						<button
							className="btn btn-primary mt-5 ml-4 "
							onClick={createTemplateForm}
						>
							Create New Template
						</button>
						{createTemplate && (
							<CreateTemplate uid={store.user.uid} names={templateNames} />
						)}
						<div>
							<input
								type="text"
								placeholder="Search templates by name"
								className="lg:w-3/12 sm:w-3/5 xs:w-full m-4 input input-primary"
								onChange={(e) => setTemplateQuery(e.target.value)}
							/>
						</div>
						<div className="m-4 grid xs:grid-col-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4   gap-y-8">
							{store.templates.userTemplates.map((template, i) => {
								if (template.name.toLowerCase().includes(templateQuery))
									return (
										<TemplateCard
											key={i}
											template={template}
											id={template.id}
											uid={store.user.uid as string}
											type="template"
										/>
									);
								else return null;
							})}
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default Template;
