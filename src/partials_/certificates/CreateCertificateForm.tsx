import { useContext } from "react";
import { useGetRecipients } from "../../api/recipientQueries";
import Context from "../../store/context";
function CreateCertificateForm() {
	const { store, dispatch } = useContext(Context);
	const recipients = useGetRecipients(store.user.institution);
	console.log("1920 get recipients:", recipients.data);
	return (
		<div>
			<h1 className="">Create Certificate</h1>
			<form></form>
		</div>
	);
}

export default CreateCertificateForm;
