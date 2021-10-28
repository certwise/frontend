import { useState, useEffect } from "react";
import * as api from "../../api/templates";
function CreateTemplate(props: any) {
	const { names, uid } = props;
	const [name, setName] = useState<any>("");
	const [description, setDescription] = useState<any>("");
	const [isValid, setIsvalid] = useState<any>(false);
	const createTemplate = async () => {
		const tNames = await api.getTemplatesNamesByUid(uid);
		if (tNames !== false && name in tNames) {
			setIsvalid(false);
		} else {
			const info = {
				uid,
				name,
				description,
			};
			const res = await api.createTemplate(info);
			console.log(res);
			window.location.reload();
		}
	};
	useEffect(() => {
		if (
			names.includes(name.toLowerCase().replace(/ /g, "-")) ||
			name.length < 5
		) {
			setIsvalid(false);
		} else {
			setIsvalid(true);
		}
	}, [name]);
	return (
		<div className="w-1/3 m-4 border-2 rounded-xl border-primary p-3">
			<div className="form-control ">
				<label className="label">
					<span className="label-text">Template Name</span>
				</label>
				<input
					type="textarea"
					onChange={(e) => setName(e.target.value)}
					placeholder="Template name"
					className="input input-primary input-bordered"
				/>
				<label className="label">
					<span className="label-text">Template Description</span>
				</label>
				<textarea
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Template description"
					className="input input-primary input-bordered"
				/>
			</div>
			<button
				onClick={() => createTemplate()}
				className="btn btn-primary mt-4"
				disabled={!isValid}
			>
				Create Template
			</button>
			{!isValid && (
				<div className="text-sm text-red-600">Invalid template name.</div>
			)}
		</div>
	);
}

export default CreateTemplate;
