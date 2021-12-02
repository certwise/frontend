import { useContext, useEffect, useState } from "react";
import { Context } from "../../store";
import { useGetByOrganization } from "../../api/recipient";
import Dropdownfull from "./DropdownRepients";
import { AiOutlineArrowRight } from "react-icons/ai";
import DropdownGroups from "./DropdownGroups";
import { useGetByOrganization as groupQueryUseGetByOrganization } from "../../api/group";

function CreateCertificateForm({
	setRecipient,
	setType,
	setGroup,
}: {
	setRecipient: any;
	setType: any;
	setGroup: any;
}) {
	const { store } = useContext(Context);
	const [createType, setCreateType] = useState<"single" | "group">("single");
	const recipients = useGetByOrganization(store.user.organization);
	const groups = groupQueryUseGetByOrganization(store.user.organization);
	const [selectedGroup, setSelectedGroup] = useState<any>();
	const [selectedreipient, setSelectedreipient] = useState<any>();
	useEffect(() => {
		setType(createType);
	}, [createType]);
	return (
		<div className="">
			<form className="mt-2">
				<div className="flex flex-row">
					<div>
						<label className="align-top text-sm" htmlFor="g1">
							Single Recipient
						</label>
						<input
							className="ml-3 mr-8 form-checkbox w-5 h-5"
							name="g1"
							type="radio"
							checked={createType === "single"}
							onChange={(e) => {
								setCreateType(e.target.checked ? "single" : "group");
							}}
							style={{ background: "#0ff" }}
						/>
					</div>
					<div>
						<label className="align-top text-sm" htmlFor="g1">
							Group
						</label>
						<input
							className="ml-3 form-checkbox w-5 h-5"
							name="g1"
							type="radio"
							checked={createType === "group"}
							onChange={(e) => {
								setCreateType(e.target.checked ? "group" : "single");
							}}
						/>
					</div>
				</div>
			</form>
			{createType === "single" && (
				<form className="mt-5 flex flex-row max-w-lg">
					<Dropdownfull
						recipients={
							recipients.data?.data?.map((user: any) => {
								return { ...user };
							}) || []
						}
						//setRecipient={setSelectedreipient}
					/>
				</form>
			)}
			{createType === "group" && (
				<form className="mt-5 flex flex-row max-w-lg">
					<DropdownGroups
						groups={groups.data?.data}
						setGroup={setSelectedGroup}
					/>
				</form>
			)}
			{selectedreipient && createType === "single" && (
				<button
					onClick={() => {
						setRecipient(selectedreipient);
					}}
					className="btn btn-sm my-5 bg-blue-500 text-white hover:bg-blue-600"
				>
					Next
					<AiOutlineArrowRight className="mt-0.5 ml-1" />
				</button>
			)}
			{selectedGroup && createType === "group" && (
				<button
					onClick={() => {
						setGroup(selectedGroup);
					}}
					className="btn btn-sm my-5 bg-blue-500 text-white hover:bg-blue-600"
				>
					Next
					<AiOutlineArrowRight className="mt-0.5 ml-1" />
				</button>
			)}
		</div>
	);
}

export default CreateCertificateForm;
