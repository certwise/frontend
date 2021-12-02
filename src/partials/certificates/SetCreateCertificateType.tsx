import { useContext } from "react";
import { actions, Context } from "../../store";

function SetCreateCertificateType() {
	const { store, dispatch } = useContext(Context);
	return (
		<div className="w-xl">
			<button
				onClick={() => {
					dispatch(actions.certificate.setCreateType("single"));
					dispatch(actions.certificate.setCreatePage(2));
				}}
				className="btn bg-blue-500 hover:bg-blue-600 text-white w-1/4 mr-2"
			>
				<svg
					className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
					viewBox="0 0 16 16"
				>
					<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
				</svg>
				<span className="hidden xs:block ml-2">
					Create Certificate for a single recipient
				</span>
			</button>
			<button
				onClick={() => {
					dispatch(actions.certificate.setCreateType("group"));
					dispatch(actions.certificate.setCreatePage(2));
				}}
				className="btn bg-blue-500 hover:bg-blue-600 text-white w-1/4 ml-2"
			>
				<svg
					className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
					viewBox="0 0 16 16"
				>
					<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
				</svg>
				<span className="hidden xs:block ml-2">
					Create Certificates for a group
				</span>
			</button>
		</div>
	);
}

export default SetCreateCertificateType;
