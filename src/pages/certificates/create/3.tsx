import { useContext } from "react";
import CreateSingleCertificate from "../../../partials/certificates/Create/CreateSingleCertificate";
import TemplateCard from "../../../partials/certificates/Create/TemplateCard";
import { Context } from "../../../store";
import { template } from "../../../store/types";

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
					<div className="max-w-xl">
						<TemplateCard
							maxHeight={500}
							template={
								store.certificates.createCertificate
									.selectedTemplate as template
							}
						/>
					</div>
				</>
			)}
		</div>
	);
}

export default Page3;
