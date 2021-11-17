import { useContext, useState } from "react";
import Context from "../../store/context";
import {
	useGetAllRecipients,
	useGetInstitution,
} from "../../api/recipientQueries";
import Dropdownfull from "./DropdownRepients";
import { AiOutlineArrowRight } from "react-icons/ai";
function CreateCertificateForm({ setRecipient }: any) {
	const { store, dispatch } = useContext(Context);
	const [createType, setCreateType] = useState<"single" | "group">("single");
	const institution = useGetInstitution(store.user.institution);
	const recipients = useGetAllRecipients(institution.data?.data.recipients);
	const [selectedreipient, setSelectedreipient] = useState<any>();

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
							onChange={(e) =>
								setCreateType(e.target.checked ? "single" : "group")
							}
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
							onChange={(e) =>
								setCreateType(e.target.checked ? "group" : "single")
							}
						/>
					</div>
				</div>
			</form>
			{createType === "single" && (
				<form className="mt-5 flex flex-row max-w-lg">
					<Dropdownfull
						users={
							recipients?.data?.map((user) => {
								return { ...user.data };
							}) || []
						}
						setRecipient={setSelectedreipient}
					/>
				</form>
			)}

			{selectedreipient && (
				<button
					onClick={() => {
						console.log(selectedreipient);
						setRecipient(selectedreipient);
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
