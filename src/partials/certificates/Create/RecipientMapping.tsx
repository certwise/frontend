import MapFields from "./MapFields";
import { useContext, useEffect, useState } from "react";
import { actions, Context } from "../../../store";
import { CustomField, recipient } from "../../../store/types";
function RecipientMapping({
	recipient,
	templateFields,
}: {
	recipient: recipient;
	templateFields: CustomField[];
}) {
	const { store, dispatch } = useContext(Context);
	const [map, setMap] = useState<any>();
	useEffect(() => {
		if (!!map) {
			const fields = Object.keys(map).map((key) => {
				if (map[key] === "name")
					return {
						name: key,
						value: recipient?.name,
					};
				if (map[key] === "email")
					return {
						name: key,
						value: recipient?.email,
					};
				return {
					name: key,
					value: recipient?.customFields.find((f) => f.name === map[key])
						?.value,
				};
			});
			dispatch(
				actions.certificate.setCreateSingleRecipientCertificateFields(fields)
			);
		}
	}, [map]);
	return (
		<div>
			<h1 className="text-lg font-bold mt-8">Map template variables: </h1>
			<div>
				Insert information about the recipient into the template variables you
				created.
			</div>
			<MapFields
				selectedTemplateFields={templateFields}
				recipientFields={recipient.customFields}
				setmap={(map) => setMap(map)}
			/>
			{store.certificates.createCertificate.singleCertificateFields &&
				map &&
				Object.keys(map).length === templateFields.length && (
					<button
						onClick={() => dispatch(actions.certificate.setCreatePage(3))}
						className="btn bg-blue-500 hover:bg-blue-600 text-white mt-5"
					>
						Review Certificate &gt;
					</button>
				)}
		</div>
	);
}

export default RecipientMapping;
