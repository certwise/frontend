import { actions, Context } from "../../../store";
import { useContext, useEffect, useState } from "react";
import { CustomField, group } from "../../../store/types";
import MapFields from "./MapFields";
import { useGet } from "../../../api/organization";
function GroupMapping({
	templateFields,
}: {
	templateFields: CustomField[];
	group: group;
}) {
	const { store, dispatch } = useContext(Context);
	const [map, setMap] = useState<any>();
	const group = store.certificates.createCertificate.selectedGroup as group;
	const organization = useGet(store.user.organization);
	useEffect(() => {
		if (map) {
			const fields: Array<{
				templateField: CustomField;
				groupField: CustomField;
			}> = [];
			Object.keys(map).forEach((key: any) => {
				fields.push({
					templateField: templateFields.find(
						(field) => field.name === key
					) as CustomField,
					groupField: map[key],
				});
			});
			dispatch(actions.certificate.setCreateGroupTemplateFields(fields));
		}
	}, [map]);
	return (
		<div>
			{!organization.isLoading && (
				<>
					<h1 className="text-lg font-bold mt-8">Map template variables: </h1>
					<div>
						Insert information about the recipient (from the selected group)
						into the template variables you created.
					</div>
					<MapFields
						selectedTemplateFields={templateFields}
						recipientFields={[
							...group.customFields,
							...organization.data?.data.customFields,
						]}
						setmap={(map) => setMap(map)}
					/>
				</>
			)}
			{store.certificates.createCertificate.groupCertificateFields &&
				map &&
				Object.keys(map).length === templateFields.length && (
					<button
						onClick={() => dispatch(actions.certificate.setCreatePage(3))}
						className="btn bg-blue-500 hover:bg-blue-600 text-white mt-5"
					>
						Review Certificates &gt;
					</button>
				)}
		</div>
	);
}

export default GroupMapping;
