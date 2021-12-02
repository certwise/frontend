import { useContext } from "react";
import * as recipientQuery from "../../../api/recipient";
import DropdownGroups from "../../../partials/certificates/DropdownGroups";
import RecipientsDropdown from "../../../partials/certificates/DropdownRepients";
import RecipientMapping from "../../../partials/certificates/RecipientMapping";
import { actions, Context } from "../../../store";
import { group, template } from "../../../store/types";
import * as groupQuery from "../../../api/group";
import GroupMapping from "../../../partials/certificates/GroupMapping";

function Page2() {
	const { store, dispatch } = useContext(Context);
	const groups = groupQuery.useGetByOrganization(store.user.organization);
	const recipients = recipientQuery.useGetByOrganization(
		store.user.organization
	);
	const { type, selectedRecipient, selectedTemplate, selectedGroup } =
		store.certificates.createCertificate;
	return (
		<div>
			{type === "single" && (
				<>
					{!recipients.isLoading && (
						<div className="max-w-xl">
							<div className="text-lg font-bold my-5">Select a recipient</div>
							<RecipientsDropdown recipients={recipients.data?.data} />
							{selectedRecipient && (
								<div className="mt-3">
									{/* <h3>Selected recipient: {selectedRecipient.name}</h3> */}
									{(selectedTemplate as template).templateFields.length > 0 && (
										<RecipientMapping
											recipient={selectedRecipient}
											templateFields={
												(selectedTemplate as template).templateFields
											}
										/>
									)}
								</div>
							)}
						</div>
					)}
					{recipients.isLoading && <div>Loading recipients...</div>}
				</>
			)}
			{type === "group" && (
				<>
					{!groups.isLoading && (
						<div className="max-w-xl">
							<div className="text-lg font-bold my-5">Select a group</div>
							<DropdownGroups
								groups={groups.data?.data}
								setGroup={(group: group) => {
									console.log(group);
									dispatch(actions.certificate.setCreateGroup(group));
								}}
							/>
							{selectedGroup && (
								<div className="mt-3">
									{/* <h3>Selected Group: {selectedGroup.name}</h3> */}
									{(selectedTemplate as template).templateFields.length > 0 && (
										<GroupMapping
											group={selectedGroup}
											templateFields={
												(selectedTemplate as template).templateFields
											}
										/>
									)}
								</div>
							)}
						</div>
					)}
					{groups.isLoading && <div>Loading groups...</div>}
				</>
			)}
		</div>
	);
}

export default Page2;
