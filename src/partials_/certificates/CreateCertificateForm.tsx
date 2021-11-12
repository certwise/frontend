import { useContext } from "react";
import Context from "../../store/context";
function CreateCertificateForm() {
	const { store, dispatch } = useContext(Context);
	return (
		<div>
			<h1 className="">Create Certificate</h1>
			<form></form>
		</div>
	);
}

export default CreateCertificateForm;
