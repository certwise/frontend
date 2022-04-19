import { useContext } from "react";
import CreateGroupCertificate from "../../../partials/certificates/Create/CreateGroupCertificate";
import CreateSingleCertificate from "../../../partials/certificates/Create/CreateSingleCertificate";
import { Context } from "../../../store";

function Page3() {
	const { store } = useContext(Context);
	return (
		<div className="ml-2 max-w-xl">
			{store.certificates.createCertificate.type === "single" && (
				<>
					<CreateSingleCertificate />
				</>
			)}
			{store.certificates.createCertificate.type === "group" && (
				<>
					<CreateGroupCertificate />
				</>
			)}
		</div>
	);
}

export default Page3;
