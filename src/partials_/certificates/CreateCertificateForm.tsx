import { useContext, useState } from "react";
import FilterButton from "./FilterButton";
import Context from "../../store/context";
import {
	useGetAllRecipients,
	useGetInstitution,
} from "../../api/recipientQueries";
import Dropdownfull from "./DropdownFull";
function CreateCertificateForm() {
	const { store, dispatch } = useContext(Context);
	const [createType, setCreateType] = useState<"single" | "group">("single");
	const institution = useGetInstitution(store.user.institution);
	const recipients = useGetAllRecipients(institution.data?.data.recipients);
	const [selectedreipient, setSelectedreipient] = useState<any>();
	const getAllRecipients = () => {
		console.log(recipients.data);
	};
	return (
		<div className="p-5">
			<form className="mt-5">
				<div className="flex flex-row">
					<div>
						<label className="align-top" htmlFor="g1">
							Single Recipient
						</label>
						<input
							className="mt-1 ml-3 mr-8 form-checkbox w-5 h-5"
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
						<label className="align-top" htmlFor="g1">
							Group
						</label>
						<input
							className="mt-1 ml-3 form-checkbox w-5 h-5"
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
			<form style={{ width: "500px" }} className="mt-5 flex flex-row">
				<Dropdownfull
					users={
						recipients?.data?.map((user) => {
							return { ...user.data };
						}) || []
					}
					setRecipient={setSelectedreipient}
				/>
			</form>

			<button
				onClick={getAllRecipients}
				className="btn my-5 bg-blue-500 text-white hover:bg-blue-600"
			>
				Create Certificate
			</button>
		</div>
	);
}

export default CreateCertificateForm;
